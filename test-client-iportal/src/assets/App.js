
function App() {
  const JoinDate = '12-10-2024';
  const username = "example username";
  const userimg = '/welcomepage/ex2.jpg';
  const post = 'example stack developer';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6', // bg-gray-100 equivalent
      }}
    >
      <div
        style={{
          width: '960px',
          height: '700px',
          minWidth: '960px',
          minHeight: '700px',
          position: 'relative',
          backgroundColor: '#ffffff', // bg-white equivalent
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        {/* Background Images Section */}
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <img
              src="/welcomepage/topleftyellowcircle.png"
              alt="loading"
              width={130}
              height={130}
              style={{ position: 'absolute', zIndex: 5 }}
            />
            <img
              src="/welcomepage/topleftbluedot.png"
              alt="loading"
              width={100}
              height={100}
              style={{ position: 'absolute', zIndex: 5 }}
            />
            <img
              src="/welcomepage/bgsquaresdesign.png"
              alt="loading"
              width={480}
              height={500}
              style={{ position: 'relative' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <img
              src="/welcomepage/whiteouterimg.png"
              alt="loading"
              width={331}
              height='reset'
              style={{ position: 'relative' }}
            />
            <img
              src="/welcomepage/whiteinnerimg.png"
              alt="loading"
              width={270}
              height='reset'
              style={{ position: 'absolute', right: 0, bottom: 60 }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 20,
              // right: '25%'
              width:'100%',
              transform: 'translateX(33%)',
            }}
          >
            <img
              src="/welcomepage/companyimg.png"
              alt="company logo"
              width={290}
              height={95}
            />
          </div>
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 5 }}>
            <img
              src="/welcomepage/toprightimg.png"
              alt="loading..."
              width={280}
                height='reset'
            />
          </div>
        </div>

        {/* Welcome Text Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 135, // top-27 (assuming 1 unit = 4px for simplicity)
            left: '9.09%', // left-1/11 equivalent
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 60,
              fontFamily: "'Lobster', cursive", // Lobster font fallback
              color: '#0A629C',
            }}
          >
            Welcome to Our Internship Team
          </p>
        </div>

        {/* User Image and Join Date Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '25%',
            top: 180, // top-45
          }}
        >
          <img src="/welcomepage/Imagecontainer.png" alt="loading"
          width={520}
          height='unset'
          style={{zIndex:5}}
          />
          <img src={userimg} alt="user imgage"
          width={265}
          height='reset'
          style={{
            position:'absolute',
            top:98,
            right:105,
            borderRadius:"50%"
          }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              marginLeft: 6, // ml-1.5
              left: '25%',
              bottom: '16.67%', // bottom-1/6
              color: '#FFFFFF',
              fontWeight: 300, // font-light
              zIndex: 10,
            }}
          >
            <p>Joining Data:</p>
            <p style={{ display: 'flex', justifyContent: 'center' }}>
              {JoinDate}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
          }}
        >
          <img
            src="/welcomepage/bottomleftimg.png"
            alt="loading..."
            width={310}
            height='reset'
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        >
          <img
            src="/welcomepage/bottomrightimg.png"
            alt="loading..."
            width={120}
            height={103}
            style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 5 }}
          />
          <p
            style={{
              fontSize: 20,
              fontFamily: "'Inter', sans-serif", // Inter font fallback
              color: '#FFFFFF',
              position: 'absolute',
              left: 108, // left-27
              bottom: 8, // bottom-2
              zIndex: 10,
            }}
          >
            www.ezitech.org
          </p>
          <img
            src="/welcomepage/bottomrightimg2.png"
            alt="loading..."
            width={93}
            height={80}
            style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 5 }}
          />
        </div>
        <div>
          <img
            src="/welcomepage/bgsquaredotsbottom.png"
            alt="loading..."
            width={480}
            height={103}
            style={{ position: 'absolute', right: 0, bottom: 0 }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          <img
            src="/welcomepage/whiteinnerimg.png"
            alt="loading"
            width={300}
            height={300}
            style={{ position: 'relative', bottom: 15, right: 130, zIndex: 2 }}
          />
          <img
            src="/welcomepage/bottomwhiteoutercircleimg.png"
            alt="loading"
            width={235}
            height='reset'
            style={{ position: 'absolute', bottom: 0, left: 0 }}
          />
        </div>

        {/* Username and Post Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 100, // bottom-25
          }}
        >
          <p
            style={{
              fontSize: 40,
              fontFamily: "'Lobster', cursive", // Lobster font fallback
              color: '#0A629C',
            }}
          >
            {username}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            position: 'absolute',
            bottom: 60, // bottom-15
          }}
        >
          <p style={{ fontSize: 30, color: '#0A629C' }}>{post}</p>
        </div>
      </div>
    </div>
  );
}

export default App;