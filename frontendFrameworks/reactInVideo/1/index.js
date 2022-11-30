var React = require('react')

function Header() {
    return (
            <header>
                <nav id="navbar">
                    <img src="./logo192.png" />
                    <ul>
                        <li>Pricing</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
    )
}

function MainContent() {
    return (
        <div className="content">
            <h1>Reasons for I'm excited to learn React</h1>
            <ul>
                <li>because i need a good job</li>
            </ul>
        </div>
    )
}

function Footer() {
    return (
            <footer className="footer">
                <small>20xx /last name here/ development. All rights reserved.</small>
            </footer>
    )
}

function Page() {
    return(
        <div className="page">
            <Header />
            <MainContent />
            <Footer />
        </div>
    )
}

ReactDOM.render(
    <Page />,
    document.getElementById("root")
)