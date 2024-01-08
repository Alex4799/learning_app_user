function Blog(){
    return(
        <section className="blog">
        <div className="d-flex justify-content-between">
            <h3>Blog</h3>
            <a href="">See More &gt;&gt;&gt;</a>
        </div>
        <div className="hr"></div>
        <div className="row blog-container py-3">
            <div className="card col-md-3">
                <img src="./image/cover.webp" className=" w-100" alt="./image/cover.webp"/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              <div className="card col-md-3">
                <img src="./image/cover.webp" className=" w-100" alt="./image/cover.webp"/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              <div className="card col-md-3">
                <img src="./image/cover.webp" className=" w-100" alt="./image/cover.webp"/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
              <div className="card col-md-3">
                <img src="./image/cover.webp" className=" w-100" alt="./image/cover.webp"/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
        </div>
    </section>
    );
}

export default Blog