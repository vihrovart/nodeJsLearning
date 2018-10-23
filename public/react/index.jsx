// Реализация компонента по средства ES6 как класс наследник от React.Component
class Hello extends React.Component {
    render(){
        return <h1>Yo! {this.props.name} {new Date().toLocaleTimeString()}</h1>
    }
}

// РЕализация компонента как "стрелочной функции"
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

function tick(){
    ReactDOM.render(
        <Hello name='Artem'></Hello>,
        document.getElementById("app")
    );
}

tick();

setInterval(tick, 1000);