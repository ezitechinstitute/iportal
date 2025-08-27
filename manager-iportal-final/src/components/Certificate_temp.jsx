import './style/Certificate_temp.css';

const Certificate = ({ internData, projects }) => {
  const handlePrint = () => {
    const content = document.getElementById('certificate-content');
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = content.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Function to calculate completion date based on join date and duration
  const calculateCompletionDate = () => {
    try {
      const joinDate = new Date(internData.join_date);
      const durationMonths = parseInt(internData.duration.split(' ')[0]);

      const completionDate = new Date(joinDate);
      completionDate.setMonth(completionDate.getMonth() + durationMonths);

      return completionDate;
    } catch (error) {
      console.error('Error calculating completion date:', error);
      return new Date(); // Fallback to current date
    }
  };

  // Function to format date as DD-MMM-YYYY
  const formatDate = date => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Function to get current date for certificate issuance
  const getCurrentDate = () => {
    return formatDate(new Date());
  };

  // Function to extract all technologies from projects
  // const getAllTechnologies = () => {
  //   if (!projects || projects.length === 0) {
  //     return 'Web Technologies'; // Default value
  //   }

  //   const technologiesSet = new Set();

  //   projects.forEach(project => {
  //     if (project.technologies) {
  //       // Split technologies by comma and add each one to the set
  //       project.technologies.split(',').forEach(tech => {
  //         technologiesSet.add(tech.trim());
  //       });
  //     }
  //   });

  //   return Array.from(technologiesSet).join(', ');
  // };

  // Function to get all project titles
  const getAllProjectTitles = () => {
    return projects.map(project => project.title).join(', ');
  };

  // Calculate dates
  const joinDate = new Date(internData.join_date);
  const completionDate = calculateCompletionDate();
  const currentDate = getCurrentDate();

  return (
    <div className='certificate-app'>
      <button className='print-button' onClick={handlePrint}>
        Get Certificate
      </button>

      <div id='certificate-content' className='print-only'>
        <div className='certificate-wrapper'>
          <img
            src='./images/certificate_temp02.png'
            alt='Certificate Template'
            className='certificate-background'
          />

          {/* Date */}
          <div className='certificate-date'>{currentDate}</div>

          {/* Name */}
          <div className='certificate-name'>{internData.name}</div>
          <div className='certificate-technology'>
            Internship In ({internData.technology || 'Web Development'})
          </div>

          {/* ETI ID and CNIC */}
          <div className='certificate-eti-id'>
            {internData.eti_id.replace('ETI-', '')}
          </div>
          <div className='certificate-cnic'>{internData.cnic}</div>

          {/* Duration Text */}
          <div className='certificate-duration-text'>
            {internData.duration} ({formatDate(joinDate)} To{' '}
            {formatDate(completionDate)})
          </div>

          {/* Details Box */}
          <div className='certificate-details'>
            <div>
              {internData.duration} ({formatDate(joinDate)} To{' '}
              {formatDate(completionDate)})
            </div>
            {/* <div>{getAllTechnologies()}</div> */}
            <div className='certificate-projects'>{getAllProjectTitles()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
