import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'

const Admin = () => {
    const {user, adminProducts} = useContext(AuthContext)
    const [products, setProducts] = useState(null)

    const fetchAdminProducts = async () => {
        try {
            const data = await adminProducts()
            setProducts(data);
        }
        catch (err) {
            console.error("Error fetching admin products: ", err)
        }
    }

    useEffect(() => {
        fetchAdminProducts()
    }, [])

  return (
    <div>
      {products ? (
        products.map(product => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
    
    ) : (
        <p>Loading products...</p>
      )}
    </div>
  )
}

export default Admin
