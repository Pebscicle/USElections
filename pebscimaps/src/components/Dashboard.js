import DashboardTopBar from '../components/DashboardTopBar';

function Dashboard({children}) {
    
    return (
        <div style={{width: '100%', height: '100vh', backgroundColor: 'green', display: 'grid', gridTemplateRows: '50px 1fr'}}>
            <DashboardTopBar>
                <button>Button #1</button>
                <button>Button #2</button>
                <button>Button #3</button>
            </DashboardTopBar>
            {children}     
        </div>
    );
  }

export default Dashboard;

