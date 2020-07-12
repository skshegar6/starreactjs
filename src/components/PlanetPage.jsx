import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import  * as planetsApiActions  from "../js/redux/actions/planets.js";
import { bindActionCreators } from "redux";

class PlanetDetailsPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            planet:{}
        }
    }

    async componentDidMount(){
        if(this.props.planets && this.props.planets.length > 0){
            let planetName = this.props.match.params.planet_name;
            let planetData = this.props.planets.filter((planet) =>{
                if(planet.name == planetName) return planet; 
            })
            this.setState({planet:planetData[0]})
        }else{
            await this.props.actions.loadPlanetsInServer();
            if(this.props.planets && this.props.planets.length > 0){
                let planetName = this.props.match.params.planet_name;
                let planetData = this.props.planets.filter((planet) =>{
                    if(planet.name == planetName) return planet; 
                })
                this.setState({planet:planetData[0]})
            }
        } 
    }    
    
    render(){
        return (
        <div>
            <h5>Welcome To Planet Page</h5>
            <div className="row">
                <div className='col-md-4'>Planet Name</div>
                <div className='col-md-4'>{this.state.planet.name}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Rotation Period</div>
                <div className='col-md-4'>{this.state.planet.rotation_period}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Orbital Period</div>
                <div className='col-md-4'>{this.state.planet.orbital_period}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Diameter</div>
                <div className='col-md-4'>{this.state.planet.diameter}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Climate</div>
                <div className='col-md-4'>{this.state.planet.climate}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Gravity</div>
                <div className='col-md-4'>{this.state.planet.gravity}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Terrain</div>
                <div className='col-md-4'>{this.state.planet.terrain}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Surface Water</div>
                <div className='col-md-4'>{this.state.planet.surface_water}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Population</div>
                <div className='col-md-4'>{this.state.planet.population}</div>
            </div>
            <div className="row">
                <div className='col-md-4'>Url</div>
                <div className='col-md-4'>{this.state.planet.url}</div>
            </div>        
        </div>
        )
    }
}

PlanetDetailsPage.propTypes = {
    planets:PropTypes.array,
    loadPlanetsInServer:PropTypes.func,
    match: PropTypes.shape({
        params: PropTypes.shape({
            planet_name:PropTypes.string
        })
    }),
    actions:PropTypes.func       
}

const mapStateToProps = state => {
    return {
      planets:state.planets.planets
    }
};
  
  function mapDispatchToProps(dispatch) {
    return {
      actions:bindActionCreators(planetsApiActions,dispatch)
    };
  }
  
  const PlanetPage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlanetDetailsPage);
  
export default PlanetPage;