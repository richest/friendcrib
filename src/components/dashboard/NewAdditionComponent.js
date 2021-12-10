import React, { forwardRef } from 'react';
import { Select, Input, Textarea, Spinner } from '../common';

const NewAdditionComponent = forwardRef((props) => {

  return (
  
    <div className="content__inner">
      <div className="page-heading">
        <h2 className="h3">{props.userId ? "Update Addition" : "Add New Addition"}</h2>
      </div>
      <div className="content-area white-bg">
        <div className="addition-form">

          <form onSubmit={props.handleSubmit} autocomplete="off">
            <span className="favourite-option d-block mb-4">
              <Input ref={props.allref.favoriteEl}
                type="checkbox"
                onChange={props.handleChange}
                name="favorite"
                checked={props.myFavProps.check}
                class="d-none"
                id="favourite__val" />
              <label for="favourite__val">
                <i class="fas fa-star cursor-pointer mr-1"></i></label>
            Mark as favorite
          </span>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="d-block">Title</label>
                  <Input
                    type="text"
                    name="title"
                    class="form-control"
                    ref={props.allref.titleEl}
                    value={props.additionprops.title}
                    onChange={props.handleChange}
                    placeholder="Enter your title" />
                </div>
                <p style={{ display: "none" }} ref={props.allref.titleElValidation} className="error-message">Please enter your title</p>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label className="d-block">URL</label>
                  <Input type="text"
                    name="url"
                    class="form-control"
                    ref={props.allref.urlEl}
                    value={props.additionprops.url}
                    onChange={props.handleChange}
                    placeholder="https://www.friendcrib.com" />
                </div>
                <p style={{ display: "none" }} ref={props.allref.urlElValidation} className="error-message">Please enter url</p>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="d-block">Type</label>
                  <Select disabled={!!props.userId ? true : false} name="type" class="form-control" ref={props.allref.typeEl} onChange={props.handleChange} value={props.additionprops.type.value} >
                    <option value="1">Movies</option>
                    <option value="2">Songs</option>
                    <option value="3">Albums</option>
                    <option value="4">Restaurants</option>
                    <option value="5">Books</option>
                    <option value="6">Podcasts</option>
                    <option value="7">Articles</option>
                  </Select>
                </div>
                <p style={{ display: "none" }} ref={props.allref.typeElValidation} className="error-message">Please enter type </p>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="d-block">Genre</label>
                  <Select name="genre" class="form-control" ref={props.allref.genreEl} onChange={props.handleChange} value={props.additionprops.genre}>
                    <option value="">Select genre</option>
                    {!!props.genreListprops &&
                      props.genreListprops.map((data, index) => {
                        return <option value={data.id}>{data.title}</option>
                      })
                    }

                  </Select>
                </div>
                <p style={{ display: "none" }} ref={props.allref.genreElValidation} className="error-message">Please enter genre</p>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="d-block">Thoughts</label>
                  <Textarea
                    ref={props.allref.thoughtsEl}
                    name="thoughts"
                    class="form-control w-100 thought-msg"
                    value={props.additionprops.thoughts}
                    onChange={props.handleChange}
                    placeholder="Enter your thoughts.."
                    defaultValue={""} />
                  {/* <textarea name="Thoughts" className="form-control w-100 thought-msg" placeholder="Enter your thoughts.." defaultValue={""} /> */}
                </div>
                <p style={{ display: "none" }} ref={props.allref.thoughtsElValidation} className="error-message">Please enter your thoughts..</p>
              </div>
              <div className="col-md-12">
                <div className="form-group position-relative btn-loader">
                  <Input type="submit" disabled={props.newAddLoading ? true : false} value={!!props.userId ? "Update" : "Submit"} defaultValue="Add Addition" class="btn" />
                  <Input ref={props.allref.confirmEl} dataToggle="modal" dataTarget="#confirm-modal" type="button"  defaultValue="Add Addition" class="btn d-none" />
                  {/* <Spinner loading={props.newAddLoading} /> */}
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>

  )
})
export default NewAdditionComponent;