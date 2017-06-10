"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');
var Link = Router.Link;


var Profile = React.createClass({



    componentWillMount: function() {
        var authorLogin = this.props.params.login; //from the path '/author:id'

        if (authorLogin) {
            this.setState({author: AuthorStore.getAuthorByLogin(authorLogin) });
        }
    },



    getInitialState: function() {
        return {
            author: { img: '', login: '', password: '', name: '', surname: '', money: '', flat1: '', flat2: '', flat3: '', flat4plus: '', pay: '', pro: false, extra: false}
        };
    },

    noMoney: function () {
      toastr.warning("no Money(");
    },
    getProButton: function () {
        var temp=this;
        if (this.state.author.pro === false)
        {
            return (
                <a className="btn btn-warning offset1" onClick={() => {
                    if (temp.state.author.money >= 20) {
                        temp.state.author.money -= 20;
                        temp.state.author.extra = true;
                        temp.setState(temp.state.author);
                    }
                    else {
                        temp.noMoney();
                    }
                }
                }>
                    <div className="row"> Upgrade to PRO</div>
                </a>
            );
        }

        else
        {return (<div> </div>); }

    },


    payInterface: function(){
        this.payForAll =  function() {};
    },
    concretePayByMoney: function (temp) {
        this.payForAll = function(){
            if(temp.state.author.pay !== 0){
                temp.state.author.money -= temp.state.author.pay;
                temp.state.author.pay = 0;
                temp.setState(temp.state.author);
                toastr.success("Thanks for payment by money from your balance!");
            }

        };

    },

    concretePayByLiqpay: function(temp){
        this.payForAll = function () {
            toastr.warning("We take money from your credit card :)");
            temp.state.author.pay = 0;
            temp.setState(temp.state.author);

        };
    },


    AbstractPayer: function() {
        var implementor;

        this.setImplementor = function(val) {
            implementor = val;
        };
        this.payForAll = function() {
            implementor.payForAll();
        };
},
    selectPayer: function(){
        var payer = new this.AbstractPayer();

        if(this.state.author.money>=this.state.author.pay)
        {
            payer.setImplementor(new this.concretePayByMoney(this));
        }
        else
        {
            payer.setImplementor(new this.concretePayByLiqpay(this));
        }
        return payer;
    },


    lucky: function () {
      toastr.success("You are lucky, + 10 for your money account :)");
    },
    PayerAdapter: function(adaptee,temp) {

        this.payWithBonus = function () {
            if((temp.state.author.extra)&&(temp.state.author.pay!=0))
            {   temp.state.author.money+=10;
                temp.setState(temp.state.author);
                temp.lucky();

            }
            adaptee.payForAll();

        };

},

    getPayButton: function () {
        var payer = new this.PayerAdapter(this.selectPayer(),this);
        return(
            <a className="btn btn-danger" onClick={()=>
            {
                payer.payWithBonus();

            }
            }>Pay</a>
        );
    },


render: function () {

        var thisPart = this;



        this.concretePayByMoney.prototype = new this.payInterface();
        this.concretePayByMoney.prototype.constructor = this.concretePayByMoney;

        this.concretePayByLiqpay.prototype = new this.payInterface();
        this.concretePayByLiqpay.prototype.constructor = this.concretePayByLiqpay;

        var Pro = function(classicAccount) {

            this.body = function () {
                thisPart.state.author.pro = true;
                return (
                    classicAccount.body()
                );
            };
        };

        var ClassicAccount = function() {
            this.body = function() {
                return (
                    <div className="row jumbotron">
                        <div className="col-md-6 ">

                            {thisPart.getProButton()}

                            <div>
                                <img className="img-rounded" src={thisPart.state.author.img}/>
                                <Link to="app" className="btn btn-inverse" >Log out</Link>
                                <div className="jumbotron">
                                    <div>{thisPart.state.author.name} {thisPart.state.author.surname}</div>
                                    <div>Количество однокомнатных квартир: {thisPart.state.author.flat1}</div>
                                    <div>Количество двухкомнатных квартир: {thisPart.state.author.flat2}</div>
                                    <div>Количество трехкомнатных квартир: {thisPart.state.author.flat3}</div>
                                    <div>Количество квартир на 4+ комнаты: {thisPart.state.author.flat4plus}</div>
                                    <div>Личный денежный счет: {thisPart.state.author.money}</div>
                                    <div>К оплате: {thisPart.state.author.pay}</div>
                                </div>
                            </div>
                            {thisPart.getPayButton()}
                        </div>
                        <div className=" jumbotron">
                            <div><Link to="flats" params={{login: thisPart.state.author.login, func: "all"}} className="btn btn-danger" >Show all </Link></div>
                            <div><Link to="flats" params={{login: thisPart.state.author.login, func: "1"}} className="btn btn-primary" >Show flat1 </Link></div>
                            <div><Link to="flats" params={{login: thisPart.state.author.login, func: "2"}} className="btn btn-primary" >Show flat2 </Link></div>
                            <div><Link to="flats" params={{login: thisPart.state.author.login, func: "3"}} className="btn btn-primary" >Show flat3 </Link></div>
                            <div><Link to="flats" params={{login: thisPart.state.author.login, func: "4"}} className="btn btn-primary" >Show flat4+</Link></div>

                        </div>
                    </div>
                );
            };
        };


        var check = function () {
          if (thisPart.state.author.extra){
              return new Pro(new ClassicAccount()).body();
          }
          else{
              return new ClassicAccount().body();
          }
        };

        return (

            check()
        );
    }
});
module.exports = Profile;