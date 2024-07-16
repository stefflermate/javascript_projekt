const expect = import('chai').expect;

const getSportolo = import('../../../../middleware/sportolo/getSportolo');

describe('getSportolo middleware ', function() {

    it('should set res.locals.sportolo with a sportolo object from the database', function(done) {
        const mw = getSportolo({
            SportoloModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '10'});
                    cb(null, 'mocksportolo');
                }
            }
        });
        
        const resMock = {
            locals: {}
        };
        
        mw(
        {
            params: {
                sportoloId: '10'
            }
        },
            resMock,
            (err) => {
            expect(resMock.locals).to.be.eql({sportolo: 'mocksportolo'});
            done();
            }
        );
    });

    it('should call next with error when there is a database problem', function(done) {
        const mw = getSportolo({
            SportoloModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '10'});
                    cb('adatbazishiba', null);
                }
            }
        });
        
        const resMock = {
            locals: {}
        };
        
        mw(
        {
            params: {
                sportoloId: '10'
            }
        },
            resMock,
            (err) => {
                expect(err).to.be.eql('adatbazishiba');
                done();
            }
        );
    });

    it('should call next when no sportolo found in the database', function(done) {
        const mw = getSportolo({
            SportoloModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: '10'});
                    cb(undefined, null);
                }
            }
        });
        
        const resMock = {
            locals: {}
        };
        
        mw(
        {
            params: {
                sportoloId: '10'
            }
        },
            resMock,
            (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({});
            done();
            }
        );
    });
});