import Link from './Link'

export default ({ info, theme = {} }) => (
  <header>
    <nav>
      <div className='links-container'>
        <Link route='/' activeClassName='active'><a>HJEM</a></Link>
        <Link prefetch route='/kart' activeClassName='active'><a>KART</a></Link>
        <Link prefetch route='/info' activeClassName='active'><a>INFO</a></Link>
        <Link prefetch route='/varsel' activeClassName='active'><a>VARSEL</a></Link>
        <Link prefetch route='/kontakt' activeClassName='active'><a>KONTAKT</a></Link>
      </div>
      { info && <div className='nav-info'>{info}</div> }
    </nav>
    <style jsx>
      {`
        header {
          grid-area: header;
          justify-self: center;
          margin: auto;
          padding: 25px;
          max-width: 900px;
        }
        .nav-info {
          position: absolute;
          font-size: 12px;
          left: 10%;
        }
        nav, nav-links {
          display: inline-block;
        }
        a {
          color: #999;
          padding: 10px;
          font-size: 12px;
        }
        a:hover {
          color: ${theme === 'black' ? 'white' : 'black'};
        }
        .active {
          color: ${theme === 'black' ? 'white !important' : 'black !important'};
        }
      `}
    </style>
  </header>
)
