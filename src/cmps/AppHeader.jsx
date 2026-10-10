import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header full">
            <section className="header-container main-layout flex justify-between align-center">
                <NavLink to="/" className="logo"><h1>Mister Toy</h1></NavLink>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    )
}
