type LayoutClientProps = {
    children: React.ReactNode;
}

 function LayoutClient ({children}:LayoutClientProps){
    return (
        <div>
        <header>
            <h1>Client Layout</h1>
        </header>
        <main>
            {children}
        </main>
        </div>
    )
}
export default  LayoutClient