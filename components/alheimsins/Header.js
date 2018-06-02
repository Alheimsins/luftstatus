import Link from './Link'

export default ({ info }) => (
  <header>
    <nav>
      <div className='links-container'>
        <Link href='/' activeClassName='active'><a>HJEM</a></Link>
        <Link href='/kontakt' activeClassName='active'><a>KONTAKT</a></Link>
      </div>
      { info && <div className='nav-info'>{info}</div> }
    </nav>
    <style jsx>
      {`
        header {
          grid-area: header;
          justify-self: center;
          background: white;
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
          color: black;
        }
        .active {
          color: black !important;
        }
      `}
    </style>
  </header>
)
