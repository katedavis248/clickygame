import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import Footer from "../Footer";
import arya from "../../images/arya.png"
import bran from "../../images/bran.png"
import brienne from "../../images/brienne.png"
import cersei from "../../images/cersei.png"
import daeny from "../../images/daeny.png"
import jaime from "../../images/jaime.png"
import jon from "../../images/jon.png"
import sansa from "../../images/sansa.png"
import theon from "../../images/theon.png"
import tormund from "../../images/tormund.png"
import tyrion from "../../images/tyrion.png"

// import data from "../../data.json";

const data = [{
    "id": 1,
    "image": arya,
    "clicked": false
},
{
    "id": 2,
    "image": bran,
    "clicked": false
},
{
    "id": 3,
    "image": brienne,
    "clicked": false
},
{
    "id": 4,
    "image": cersei,
    "clicked": false
},
{
    "id": 5,
    "image": daeny,
    "clicked": false
},
{
    "id": 6,
    "image": jaime,
    "clicked": false
},
{
    "id": 7,
    "image": jon,
    "clicked": false
},
{
    "id": 8,
    "image": sansa,
    "clicked": false
},
{
    "id": 9,
    "image": theon,
    "clicked": false
},
{
    "id": 10,
    "image": tormund,
    "clicked": false
},
{
    "id": 11,
    "image": tyrion,
    "clicked": false
}
];

class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount() {
        this.setState({ data: this.shuffleData(this.state.data) });
    }

    handleCorrectGuess = newData => {
        const { topScore, score } = this.state;
        const newScore = score + 1;
        const newTopScore = Math.max(newScore, topScore);

        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
    };

    handleIncorrectGuess = data => {
        this.setState({
            data: this.resetData(data),
            score: 0
        });
    };

    resetData = data => {
        const resetData = data.map(item => ({ ...item, clicked: false }));
        return this.shuffleData(resetData);
    };

    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
            i--;
        }
        return data;
    };

    handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item };
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    guessedCorrectly = true;
                }
            }
            return newItem;
        });
        guessedCorrectly
            ? this.handleCorrectGuess(newData)
            : this.handleIncorrectGuess(newData);
    };

    render() {
        return (
            <div>
                <Nav score={this.state.score} topScore={this.state.topScore} />
                <Header />
                <Container>
                    {this.state.data.map(item => (
                        <ClickItem
                            key={item.id}
                            id={item.id}
                            shake={!this.state.score && this.state.topScore}
                            handleClick={this.handleItemClick}
                            image={item.image}
                        />
                    ))}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Game;
