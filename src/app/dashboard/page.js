
export default function Dashboard() {
  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="fas fa-users"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header"></div>
                  <h6>Total Berita</h6>
                  <div className="card-body">20 Berita</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
