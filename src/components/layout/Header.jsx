function Header(props) {
    return ( 
        <header className="flex flex-col full    "> 
            <h1 className="text-5xl self-center font-extrabold "> {props.title} </h1>
            <h4 className="text-2xl self-center mt-2">Pay Babay</h4>
        </header>
    );
}

export default Header;