import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  * as planetsApiActions  from "../js/redux/actions/planets.js";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          planets:[],
          filterData :[],
          searchKeyWord:''
        };
    }
    async componentDidMount(){
      if(this.props.planets.length > 0){
        this.setState({planets:this.props.planets});
      }else{
        await this.props.actions.loadPlanetsInServer();
        this.setState({planets:this.props.planets}); 
      }
    }

    onChangeData(evt){
      this.setState({ searchKeyWord: evt.target.value });
      this.props.actions.searchDataInStore(evt.target.value)
    }

    render(){
      const buttonInputText = {
        padding: '10px',
        fontSize: '17px',
        border: '1px solid grey',
        float: 'left',
        width: '80%',
        background: '#f1f1f1'
      }
      
      const styleButton = {
        float: 'left',
        width: '20%',
        padding: '10px',
        background: '#2196F3',
        color: 'white',
        fontSize: '17px',
        border: '1px solid grey',
        borderLeft: 'none',
        cursor: 'pointer',
      }

      const card= {
        height : '100px'
      }
      
        return (
          <div>
          <div style={{'height':'200px'}}>
              <div className="example"  style={{'paddingTop':'50px'}}>
                <input style={buttonInputText} type="text" placeholder="Enter search plannets.." name="search"  value={this.state.searchKeyWord} onChange={this.onChangeData.bind(this)}/>
                <button style={styleButton} type="submit" >Search</button>
              </div>
          </div>
          <div className="row">
          {(this.props.filteredItems && this.props.filteredItems.length >0) ? this.props.filteredItems.map(el => (
            <div className="col-md-4" style={{'paddingBottom':'20px'}} key={el.name}>
            <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{el.name}</h5>
                  <p className="card-text">Description about planet</p>
                  <Link  className="btn btn-primary" to={"/planet/"+el.name}>Click To Planet</Link>
                </div>
             </div>
            </div>
          ))
        : <h5>No Data Found</h5>
        }
            </div>
          </div>        
        )
    }
}
DashBoard.propTypes = {
    loadPlanetsInServer:PropTypes.func,
    searchDataInStore:PropTypes.func,
    filteredItems:PropTypes.array
}

const mapStateToProps = state => {
    return {
      filteredItems: state.planets.planets.filter((item) => item.name.toLowerCase().includes(state.planets.searchText.toLowerCase())),
      planets:state.planets.planets
    }
};
  
  function mapDispatchToProps(dispatch) {
    return {
      actions:bindActionCreators(planetsApiActions,dispatch)
    };
  }
  
  const DashBoardPlanetsList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashBoard);
  
export default DashBoardPlanetsList;