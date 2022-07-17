import React, {Component} from "react";
import "./App.css";

export default class App extends Component{
  btnStyle={
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  getStyle = (completed) =>{
    return{
      padding:"10px",
      borderBottom:"1px #ccc dotted",
      textDecoration: completed ? "line-through":"none",
    }
  }
  state={
    todoDatas : [],
    value: ""
  }

  handleClick = (id) =>{
    let newTodoData=this.state.todoDatas.filter(data => data.id !== id)
    console.log("뉴투두데이터",newTodoData);
    this.setState({todoDatas: newTodoData});
  }

  handleChange = (e) =>{
    console.log("입력시 발생하는 이벤트",e.target.value);
    this.setState({value:e.target.value})
  }

  handleSubmit =(e) =>{
    // form안에 input을 전송할 때 페이지 리로드 되는 것을 막아준다.
    e.preventDefault();

    //새로운 할일
    let newTodo={
      id: Date.now(), // 유니크한 값 :: 현재 날짜
      title: this.state.value,
      completed: false,
    };

    //새로운 할 일 더해주기.
    this.setState({ todoDatas: [...this.state.todoDatas, newTodo], value:""})
  }

  handleCompleChange = (id) => {
    let newTodoData = this.state.todoDatas.map((data) => {
      if(data.id === id){
        data.completed = !data.completed;
      }
      return data;
    });
    this.setState({todoDatas: newTodoData})
  }

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>ToDo List</h1>
          </div>

        {this.state.todoDatas.map((data) =>(
          <div style={this.getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false} onChange={()=>this.handleCompleChange(data.id)} />
              {data.title}
            <button style={this.btnStyle} onClick={()=>this.handleClick(data.id)}>x</button>
          </div>
        ))}

{/* Todo리스트 추가하는 부분 */}
          <form style={{display:'flex'}} onSubmit={this.handleSubmit}>
            <input type="text" name="value" 
                  style={{flex:'10', padding:'5px'}}
                  placeholder="Please enter what you need to do"
                  value={this.state.value}
                  onChange={this.handleChange}
            />
          
            <input type="submit"
            value="입력"
            className="btn"
            style={{flex: '1'}}
            />

          </form>


        </div>
      </div>
    )
  }
}