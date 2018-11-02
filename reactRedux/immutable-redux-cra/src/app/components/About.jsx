import React, { Component } from 'react'
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Navigation from "./Navigation"

class AboutCompany extends Component {
    render() {
        return (
            <h2>О компании</h2>
        );
    }
}

class AboutProject extends Component {
    render() {
        console.log(this.props);
        const projectName = this.props.match.params.projectName;
        return (
            <h2>О проекте {projectName}</h2>
        );
    }
}

class AboutItem extends Component {
    constructor(props){
        super(props);
        const itemId = this.props.routeProps.match.params.itemId;
        this.state = {itemId: itemId, item: {}, isLoading: false, error: null};
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.setState({isLoading: true});
        var itemId = this.state.itemId;
        fetch(`/api/getitem/${itemId}`)
        .then(res => {
            console.log(res);
            
            if(res.status === 200){
                return res.json();
            }else{
                throw new Error ("Error....")
            }
        })
        .then(resJson => {
            console.log(resJson)
            this.setState({item: resJson, isLoading: false});
        })
        .catch(error => {
            this.setState({isLoading: false, error})
        });
    }

    renderItem(item){
        console.log(item);
        return (<div>Title: {item.title}, count: {item.count}</div>);
    }
    render(){
        console.log(this);

        if(this.state.error){
            return (<div>error:{this.state.error.message}</div>)
        }

        if(this.state.isLoading){
            return (<div>loading...</div>)
        }

        const element = this.renderItem(this.state.item);

        return (
            <div>
                <div>Об элементе под номером {this.state.itemId}</div>
                {element}
            </div>
        );
    }
}

class About extends Component {
    render(){
        return (
            <div>
                <Navigation />
                <h2>Информация:</h2>
                    
                    <Switch>
                        <Route path="/about/company" component={AboutCompany} />
                        <Route exact path="/about/project" component={AboutProject} />
                        <Route path="/about/project/:projectName" component={AboutProject} />
                        <Route exact path="/about/item/:itemId" render={(props) => <AboutItem routeProps={props} props={this.props} />} />
                    </Switch>
            </div>
        );
    }
}

export default About;