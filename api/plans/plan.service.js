const { Plan, Testimonial, User, Op, Sendmessage } = require('../../sequelize');
var p;

module.exports = {
    getplan: async (data, callBack) => {
        await Plan.findAll({

        }).then(getplanlist => callBack(null, getplanlist)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    getplanse: async (data, callBack) => {
        await Plan.findAll({
            where: { status: 'Y' }
        }).then(planlist => callBack(null, planlist)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    getsendmessagelist: async (data, callBack) => {
        await Sendmessage.findAll({
            order: [['id', 'DESC']],
        }).then(getplanlist => callBack(null, getplanlist)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    gettestimoniallist: async (data, callBack) => {
        await Testimonial.findAll({

        }).then(gettestimonial => callBack(null, gettestimonial)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    gettestimonialfirst: async (data, callBack) => {
        await Testimonial.findAll({
            where: { status: 'Y' },
            order: [['id', 'ASC']],
        }).then(gettestimonial => callBack(null, gettestimonial)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    getuserfirst: async (data, callBack) => {
        await User.findOne({
            where: { role_id: 1 },
            order: [['id', 'ASC']],
        }).then(getuser => callBack(null, getuser)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    getplanforselect: async (data, callBack) => {
        await Plan.findAll({
            where: { status: 'Y', id: { [Op.notIn]: [5] } },
            order: [['id', 'ASC']],
        }).then(getplanlist => callBack(null, getplanlist)).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    addplan: async (data, callBack) => {

        await Plan.create({ name: data.name, price: data.price }).then(function () {
            Plan.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    addtestimonial: async (data, callBack) => {

        await Testimonial.create({ name: data.name, description: data.description }).then(function () {
            Testimonial.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    editplan: async (data, callBack) => {

        await Plan.update({ name: data.name, price: data.price }, {
            where: { id: data.id }
        }).then(function () {
            Plan.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    edittestimonial: async (data, callBack) => {

        await Testimonial.update({ name: data.name, price: data.price }, {
            where: { id: data.id }
        }).then(function () {
            Testimonial.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    editshows: async (data, callBack) => {

        await Plan.findByPk(data.id).then(notes => callBack(null, notes)).
            catch(function (err) {
                // handle error;
                return callBack(err);
            });
    },
    edittestimonialshows: async (data, callBack) => {

        await Testimonial.findByPk(data.id).then(notes => callBack(null, notes)).
            catch(function (err) {
                // handle error;
                return callBack(err);
            });
    },
    planupdatestatusbyid: async (data, callBack) => {


        await Plan.update({ status: data.name }, {
            where: { id: data.id }
        }).then(function () {
            Plan.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });



    },
    testimonialupdatestatusbyid: async (data, callBack) => {


        await Testimonial.update({ status: data.name }, {
            where: { id: data.id }
        }).then(function () {
            Testimonial.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });



    },


    plandeletesuperbyid: async (data, callBack) => {
        await Plan.destroy({
            where: { id: data.id }
        }).then(function () {
            Plan.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
    testimonialdeletesuperbyid: async (data, callBack) => {
        await Testimonial.destroy({
            where: { id: data.id }
        }).then(function () {
            Testimonial.findAll({

            }).then(notes => callBack(null, notes));
        }).catch(function (err) {
            // handle error;
            return callBack(err);
        });
    },
};
