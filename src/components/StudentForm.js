import React, { useState } from 'react';
import 'firebase/database';
import { getDatabase, ref, child, set, get, onValue, off } from "firebase/database";


const StudentForm = () => {
  const initialFormData = {
    name: '',
    branch: '',
    year: '',
    imageUrl: '',
    value: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  function uploadPlayer(userId, name, year, branch, imageUrl, value) {
    const db = getDatabase();
    set(ref(db, 'players/' + userId), {
      name: name,
      year: year,
      branch: branch,
      imgurl: imageUrl,
      value: value,
    });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const { name, branch, year, imageUrl} = formData;
    uploadPlayer(name,name,year,branch,imageUrl,0);
  }

   


  return (
    <div className="container">
      <h2 className="display-6">Student Data Entry</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            className="form-control"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
}
;


export default StudentForm;
