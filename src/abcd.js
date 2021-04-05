import React from "react";
var a=10
export default class Abcd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            abc:"abc"
        }
    }
    abc=()=>{
        a=4
        this.setState({
            abc:"1234"
        })
    }
    render(){
        return(
            <div>
                {a}
                {this.state.abc}
                <button onClick={this.abc}>abc</button>
            </div>
        )
    }

}