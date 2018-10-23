// Реализация компонента по средства ES6 как класс наследник от React.Component
class Hello extends React.Component {
    constructor(props){
        super(props);

        this.state = {name: props.name, date: new Date()};
    }

    componentDidMount(){
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    tick(){
        this.setState({date: new Date()});
    }

    render(){
        return <h1>Yo! {this.state.name} {this.state.date.toLocaleTimeString()}</h1>
    }
}

// Реализация компонента как "стрелочной функции"
const Header = (props) => {
    const {siteName}  = props;

    return <div>Рады вас приветствовать на {siteName}</div>
}

// Компонент переключатель
class Toggle extends React.Component{
    constructor(props){
        super(props);

        this.state = {class: "off", label: "Нажми меня"};

        this.press = this.press.bind(this);
    }
    press(){
        var className = this.state.class == "off" ? "on" : "off";

        this.setState({class: className});
    }

    render(){
        return <div onClick={this.press} className={this.state.class + " buttonToggle"}>{this.state.label}</div>;
    }
}

Header.defaultProps = {siteName: "Тестовый сайт"}

ReactDOM.render(<Toggle></Toggle>, document.getElementById("toggle"));

ReactDOM.render(
    <Header></Header>,
    document.getElementById("header")
)

    ReactDOM.render(
        <Hello name='Artem'></Hello>,
        document.getElementById("app")
    );
