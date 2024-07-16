const expect = import('chai').expect;

const saveSportolo = import('../../../../middleware/sportolo/saveSportolo');

describe('saveSportolo middleware ', function () {

    it('should set res.locals.sportolo with a sportolo object from the database', function (done) {
        const mw = saveSportolo({
            SportoloModel: 'valami'
        });

        mw(
            {
                body: {
                    name: 'Balazsi Balint',
                    year: 2004,
                    sport: 'szertorna'
                },

                params: {
                    sportoloId: '10'
                }
            },
            {
                locals: {
                    egyesulet: {
                        _id: 'egyesuletid'
                    },
                    sportolo: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: (where) => {
                    expect(where).to.be.eql('/sportolo/egyesuletid');
                    done();
                }
            },
            (err) => {
                // no next
            }
        );
    });

    it('should call next with err if there is a database error', function (done) {
        const mw = saveSportolo({
            SportoloModel: 'valami'
        });

        mw(
            {
                body: {
                    name: 'Balazsi Balint',
                    year: 2004,
                    sport: 'szertorna'
                },

                params: {
                    sportoloId: '10'
                }
            },
            {
                locals: {
                    egyesulet: {
                        _id: 'egyesuletid'
                    },
                    sportolo: {
                        save: (cb) => {
                            cb('adatbazishiba');
                        }
                    }
                },
                redirect: (where) => {

                }
            },
            (err) => {
                // no next
                expect(err).to.be.eql('adatbazishiba');
                done();
            }
        );
    });

    it('should call next with num error on ev problem', function (done) {
        const mw = saveSportolo({
            SportoloModel: 'valami'
        });

        mw(
            {
                body: {
                    name: 'Balazsi Balint',
                    year: 'asd',
                    sport: 'szertorna'
                },

                params: {
                    sportoloId: '10'
                }
            },
            {
                locals: {
                    egyesulet: {
                        _id: 'egyesuletid'
                    },
                    sportolo: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: (where) => {

                }
            },
            (err) => {
                expect(err).to.be.instanceOf(Error);
                expect(err.toSting()).to.be.eql('Error: Az évet számmal kell megadni!');
                done();
            }
        );
    });

    it('should set res.locals.sportolo with a sportolo object created by the MW', function (done) {
        class SportoloMockModel {
            save(cb) {
                cb(null);
            }
        };

        const mw = saveSportolo({
            SportoloModel: SportoloMockModel
        });

        mw(
            {
                body: {
                    name: 'Balazsi Balint',
                    year: 2004,
                    sport: 'szertorna'
                },

                params: {
                    sportoloId: '10'
                }
            },
            {
                locals: {
                    egyesulet: {
                        _id: 'egyesuletid'
                    }
                },
                redirect: where => {
                    expect(where).to.be.eql('/sportolo/egyesuletid');
                    done();
                }
            },
            (err) => {

            }
        );
    });
});