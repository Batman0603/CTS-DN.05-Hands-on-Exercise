import React, { Component } from "react";

class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 5,
            amount: "",
            currency: ""
        };
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        });
    };

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        });
    };

    sayHello = () => {
        alert("Hello! Member!");
    };

    sayWelcome = (msg) => {
        alert(msg);
    };

    onPress = () => {
        alert("I was clicked");
    };

    handleAmount = (event) => {
        this.setState({
            amount: event.target.value
        });
    };

    handleCurrency = (event) => {
        this.setState({
            currency: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let euro = this.state.amount * 80;

        alert(
            "Converting to Euro Amount is " + euro
        );
    };

    multipleMethods = () => {
        this.increment();
        this.sayHello();
    };

    render() {

        return (

            <div>

                <h3>{this.state.count}</h3>

                <button onClick={this.multipleMethods}>
                    Increment
                </button>

                <br />

                <button onClick={this.decrement}>
                    Decrement
                </button>

                <br />

                <button
                    onClick={() =>
                        this.sayWelcome("welcome")
                    }
                >
                    Say welcome
                </button>

                <br />

                <button onClick={this.onPress}>
                    Click on me
                </button>

                <br />

                <br />

                <h1 style={{ color: "green" }}>
                    Currency Convertor!!!
                </h1>

                <form onSubmit={this.handleSubmit}>

                    <table>

                        <tbody>

                            <tr>
                                <td>Amount:</td>

                                <td>

                                    <input
                                        type="text"
                                        value={this.state.amount}
                                        onChange={this.handleAmount}
                                    />

                                </td>
                            </tr>

                            <tr>

                                <td>Currency:</td>

                                <td>

                                    <input
                                        type="text"
                                        value={this.state.currency}
                                        onChange={this.handleCurrency}
                                    />

                                </td>

                            </tr>

                            <tr>

                                <td></td>

                                <td>

                                    <button type="submit">
                                        Submit
                                    </button>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </form>

            </div>

        );
    }
}

export default Counter;