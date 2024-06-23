
const Menu = ({selectedUserStatus}) => {
    const userTypeList = [
        {
            "id": 1,
            "type": "Admin"
        },
        {
            "id": 2,
            "type": "Registrar"
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        selectedUserStatus(value)
    };

    return(
        <div className='container'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary me-auto">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Select the login type</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <select className='form-control'
          onChange={handleChange}>
          {userTypeList.map(userTypes => (
                            <option key={userTypes.type} value={userTypes.id}>
                            {userTypes.type}
                            </option>
                        ))}
          </select>
        </li>

        
      </ul>
      
    </div>
  </div>

  
</nav>
</div>
    )
}

export default Menu;