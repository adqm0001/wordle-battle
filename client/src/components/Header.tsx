function Header({title}: {title: string}) {
  return ( 
    <div className='title'>
      <h1>{title}</h1>
      <p>Real time 1v1 Wordle</p>
    </div>
  )
};

export default Header;

