import React from 'react'
import { useState, useEffect } from 'react'
import { InternSidebar } from '../interns-components/InternSidebar';
import { InternTopbar } from '../interns-components/InternTopbar/InternTopbar';
import './RecommendIntern.css';

function RecommendIntern() {
  return (
    <>
      <div className="sidebar">
        <InternSidebar />
      </div>
      
      <div className="topbar">
        <InternTopbar />
      </div>
      
      {/* Main Content Area */}
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-header">
            <h1 className="content-title">Recommend an Intern</h1>
            <div className="content-description">
              <p className="description-text">This feature is under development.</p>
              <p className="description-text">Please check back later!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecommendIntern