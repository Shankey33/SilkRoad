
import Product from '../Models/Product.js';

const getAdminProducts = async (req, res) => {
    const id = req.user?.id || req.params?.id || req.query?.id;
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const products = await Product.find({ owner: id });
        console.log('getAdminProducts - owner:', id, 'products found:', products.length);
        return res.status(200).json(products);
    } catch (error) {
        console.error('getAdminProducts error for owner', id, error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

export { getAdminProducts };