
function DashboardTopBar( {children} ) {
    
    return (
        <div style={{backgroundColor: 'orange', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '16px'}}>
            {children}
        </div>
    );
  }

export default DashboardTopBar;

