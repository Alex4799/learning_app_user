function Member(){
    return(
        <section className="member">
        <div className="member-header">
            <h3>Member</h3>
            <div className="hr"></div>
        </div>
        <div className=" p-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active bg-deep-dark" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className=" bg-deep-dark" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className=" bg-deep-dark" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="card p-5">
                      <img src="./image/coding_cover.jpg" className="card-img-top w-100" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <h6>Instructor</h6>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="card p-5">
                      <img src="./image/coding_cover.jpg" className="card-img-top w-100" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <h6>Instructor</h6>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="card p-5">
                      <img src="./image/coding_cover.jpg" className="card-img-top w-100" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <h6>Instructor</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bg-deep-dark" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon bg-deep-dark" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Member