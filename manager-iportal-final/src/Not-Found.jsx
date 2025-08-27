'use client';

export default function NotFound() {
  return (
    <div className='not-found-container'>
      <div className='content-wrapper'>
        <div className='error-code'>
          <span className='four'>4</span>
          <div className='zero-container'>
            <div className='zero'>
              <div className='zero-inner'></div>
            </div>
          </div>
          <span className='four'>4</span>
        </div>

        <div className='message-section'>
          <h1 className='title'>Page Not Found</h1>
          <div className='status-badge'>
            <span className='status-text'>SERVICE DISCONTINUED</span>
          </div>

          <p className='description primary'>
            The page you're looking for has been discontinued or is no longer
            available on our platform.
          </p>

          <div className='additional-info'>
            <div className='info-item'>
              <span className='info-icon'>⚠️</span>
              <span className='info-text'>
                This content has been temporarily disabled by our system
              </span>
            </div>
            <div className='info-item'>
              <span className='info-icon'>🔒</span>
              <span className='info-text'>
                The requested resource has been permanently removed
              </span>
            </div>
            <div className='info-item'>
              <span className='info-icon'>📍</span>
              <span className='info-text'>
                The URL may have been changed or has expired
              </span>
            </div>
            <div className='info-item'>
              <span className='info-icon'>🚫</span>
              <span className='info-text'>
                Access to this resource is currently restricted
              </span>
            </div>
          </div>

          <p className='description secondary'>
            Don't worry! You can return to our homepage or explore other
            sections of our website.
            <span onClick={() => window.history.back()} className='btn1'>
              Go Back
            </span>
          </p>
        </div>

        <div className='floating-elements'>
          <div className='particle particle-1'></div>
          <div className='particle particle-2'></div>
          <div className='particle particle-3'></div>
          <div className='particle particle-4'></div>
          <div className='particle particle-5'></div>
        </div>
      </div>

      <style jsx>{`
        .btn1 {
          color: #ff6b6b; /* Default text color */
          cursor: pointer; /* Show pointer on hover */
          padding-left: 10px; /* Space from the left */
          transition: color 0.3s ease, text-decoration 0.3s ease;
        }

        .btn1:hover {
          text-decoration: underline; /* Add underline on hover */
        }
        .not-found-container {
          min-height: 100vh;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
          overflow: hidden;
        }

        .content-wrapper {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 700px;
          width: 100%;
        }

        .error-code {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
        }

        .four {
          font-size: 8rem;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .zero-container {
          margin: 0 20px;
          position: relative;
        }

        .zero {
          width: 100px;
          height: 100px;
          border: 8px solid #ffffff;
          border-radius: 50%;
          position: relative;
          animation: rotate 3s linear infinite;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }

        .zero-inner {
          width: 50px;
          height: 50px;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: counter-rotate 3s linear infinite;
        }

        .message-section {
          margin-bottom: 50px;
        }

        .title {
          font-size: 2.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: fadeInUp 1s ease-out;
        }

        .status-badge {
          display: inline-block;
          background: rgba(255, 107, 107, 0.2);
          border: 2px solid #ff6b6b;
          border-radius: 25px;
          padding: 8px 20px;
          margin-bottom: 25px;
          animation: fadeInUp 1s ease-out 0.1s both;
        }

        .status-text {
          color: #ff6b6b;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .description {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .description.primary {
          font-size: 1.3rem;
          font-weight: 500;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .description.secondary {
          font-size: 1.1rem;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .additional-info {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 25px;
          margin: 30px 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .info-item {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-icon {
          margin-right: 12px;
          font-size: 1.2rem;
        }

        .info-text {
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.8s both;
        }

        .btn-primary {
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          color: #ffffff;
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
        }

        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-primary:hover .btn-glow {
          left: 100%;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 15px 30px;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 15%;
          animation-delay: 1s;
        }

        .particle-3 {
          width: 40px;
          height: 40px;
          top: 30%;
          right: 25%;
          animation-delay: 2s;
        }

        .particle-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 3s;
        }

        .particle-5 {
          width: 50px;
          height: 50px;
          bottom: 40%;
          right: 10%;
          animation-delay: 4s;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes counter-rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .four {
            font-size: 8rem;
          }

          .zero {
            width: 80px;
            height: 80px;
          }

          .zero-inner {
            width: 40px;
            height: 40px;
          }

          .title {
            font-size: 2rem;
          }

          .description.primary {
            font-size: 1.1rem;
          }

          .description.secondary {
            font-size: 1rem;
          }

          .additional-info {
            padding: 20px;
            margin: 20px 0;
          }

          .info-item {
            font-size: 0.9rem;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .four {
            font-size: 6rem;
          }

          .zero {
            width: 60px;
            height: 60px;
          }

          .zero-inner {
            width: 30px;
            height: 30px;
          }

          .title {
            font-size: 1.5rem;
          }

          .additional-info {
            padding: 15px;
          }

          .info-item {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
