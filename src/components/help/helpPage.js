"use strict";

var React = require('react');

var About = React.createClass({

    render: function () {
        return (
            <div className="jumbotron">
                <h1>Помощь</h1>
                <p>
                    Часто задаваемые вопросы
                    <ul>
                        <li>
                            Какие возможны способы оплаты?
                            <p>PayPal,Privat24</p>
                        </li>
                        <li>
                            Не видна ли моя информация другим пользователям?
                            <p>Нет</p>
                        </li>
                        <li>
                            В чем преимущество данного сервиса?
                            <p>Не нужно стоять в очередях</p>
                        </li>

                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;