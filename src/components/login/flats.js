"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/loginActions');
var toastr = require('toastr');
var Link = Router.Link;

var Flats = React.createClass({
    componentWillMount: function() {
        var authorLogin = this.props.params.login;
        if (authorLogin) {
            this.setState({author: AuthorStore.getAuthorByLogin(authorLogin) });
            this.setState(this.state.author);

        }
    },

    getInitialState: function() {
        return {
            author: { img: '', login: '', password: '', name: '', surname: '', money: '', flat1: '', flat2: '', flat3: '', flat4plus: '', pay: '', pro: false}
        };
    },

    update: function(){
        AuthorActions.updateAuthor(this.state.author);
        toastr.success("User Updated");
    },

    render: function () {

        var thisPart = this;

        var FlatDisplay = function(strategy){
            this.strategy = strategy;
        };
        var Strategy = function () {};

        Strategy.prototype.execute = function () {
            return new Error("need to define!");
        };

        var DisplayerStrategy = function () {};

        DisplayerStrategy.prototype = Object.create(Strategy.prototype);
        DisplayerStrategy.prototype.execute = function() {
            var temp = this;
            return (
            <div className="jumbotron">
                <div>{temp.body()}</div>
                <div>{temp.info()}</div>
            </div>

            );
        };
        var i = 0;
        DisplayerStrategy.prototype.body = function () {
            if (thisPart.props.params.func === "all")
                {i++; }
            else{
                i = thisPart.props.params.func;
            }
            return (
                <div >
                    <div>
                        <div> Квартира с {i} комнатой(ами) </div>
                        <img className="img-rounded" src="../../images/defaultflat.jpg"/>
                        <Link to="profile" params={{login: thisPart.state.author.login}} className="btn"> Назад </Link>
                    </div>
                </div>
            );
        };
        DisplayerStrategy.prototype.info = function () {
            return (
                <div>
                    <p>Рыночная стоимость:</p>
                    <p>Стоимость коммунальных услуг:</p>
                    <p>Средний метраж:</p>
                </div>
            );
        };
        FlatDisplay.prototype.display = function () {
            return this.strategy.execute();
        };

        var DisplayerFlat1Strategy = function () {};

        DisplayerFlat1Strategy.prototype = Object.create(DisplayerStrategy.prototype);
        DisplayerFlat1Strategy.prototype.info = function () {
            return (
                <div>
                    <p>Количество: {thisPart.state.author.flat1}</p>
                    <p>Рыночная стоимость:100000</p>
                    <p>Стоимость коммунальных услуг:100</p>
                    <p>Средний метраж:30</p>
                </div>
            );
        };

        var DisplayerFlat2Strategy = function () {};

        DisplayerFlat2Strategy.prototype = Object.create(DisplayerStrategy.prototype);
        DisplayerFlat2Strategy.prototype.info = function () {
            return (
                <div>
                    <p>Количество: {thisPart.state.author.flat2}</p>
                    <p>Рыночная стоимость:200000</p>
                    <p>Стоимость коммунальных услуг:200</p>
                    <p>Средний метраж:40</p>
                </div>
            );
        };

        var DisplayerFlat3Strategy = function () {};

        DisplayerFlat3Strategy.prototype = Object.create(DisplayerStrategy.prototype);
        DisplayerFlat3Strategy.prototype.info = function () {
            return (
                <div>
                    <p>Количество: {thisPart.state.author.flat3}</p>
                    <p>Рыночная стоимость:300000</p>
                    <p>Стоимость коммунальных услуг:300</p>
                    <p>Средний метраж:50</p>
                </div>
            );
        };

        var DisplayerFlat4Strategy = function () {};
        DisplayerFlat4Strategy.prototype = Object.create(DisplayerStrategy.prototype);
        DisplayerFlat4Strategy.prototype.info = function () {
            return (
                <div>
                    <p>Количество: {thisPart.state.author.flat4plus}</p>
                    <p>Рыночная стоимость:400000</p>
                    <p>Стоимость коммунальных услуг:400</p>
                    <p>Средний метраж:50+</p>
                </div>
            );
        };
        var ourFlat;
        var Facade = new function () {
            var fl1 = new DisplayerFlat1Strategy(),
                fl2 = new DisplayerFlat2Strategy(),
                fl3 = new DisplayerFlat3Strategy(),
                fl4 = new DisplayerFlat4Strategy();

            this.getAll = new function () {
                return ([new FlatDisplay(fl1), new FlatDisplay(fl2), new FlatDisplay(fl3), new FlatDisplay(fl4)]);

            };
        };


        var chooseFlat = function () {

            switch (thisPart.props.params.func) {
                case "1":
                    ourFlat = [new FlatDisplay(new DisplayerFlat1Strategy())];
                    break;
                case "2":
                    ourFlat = [new FlatDisplay(new DisplayerFlat2Strategy())];
                    break;
                case "3":
                    ourFlat = [new FlatDisplay(new DisplayerFlat3Strategy())];
                    break;
                case "4":
                    ourFlat = [new FlatDisplay(new DisplayerFlat4Strategy())];
                    break;
                case "all":
                    ourFlat = Facade.getAll;
                    break;
                default:
                    ourFlat = [new FlatDisplay(new DisplayerStrategy())];
                    break;
            }
            return (
                <div>{ourFlat.map(function (flat) {
                    return (flat.display());
                })
                }</div>
            );
        };

        return (
            <div>{chooseFlat()}</div>
        );
    }
});

module.exports = Flats;