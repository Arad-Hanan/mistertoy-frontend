import { NavLink } from 'react-router-dom'

import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

export function AppHeader() {
    const isOnline = useOnlineStatus()

    return (
        <header className="app-header full">
            <section className="header-container main-layout flex justify-between align-center">
                <NavLink to="/" className="logo"><h1>Mister Toy</h1></NavLink>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <span className={`online-status ${isOnline ? 'online' : 'offline'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </nav>
            </section>
        </header>
    )
}
