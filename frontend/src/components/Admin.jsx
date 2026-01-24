import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import loading_gif from '../assets/loading.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faPlus, 
  faTrash, 
  faEdit, 
  faSearch, 
  faChartLine, 
  faUsers, 
  faShoppingCart,
  faArrowUp,
  faArrowDown,
  faGauge,
  faCog,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const { adminProducts, user } = useContext(AuthContext);
    const [products, setProducts] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('products');

    const fetchAdminProducts = React.useCallback(async () => {
        try {
            const data = await adminProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching admin products: ", err);
        }
    }, [adminProducts]);

    useEffect(() => {
        fetchAdminProducts();
    }, [fetchAdminProducts]);

    const filteredProducts = products?.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Products', value: products?.length || 0, icon: faBox, color: 'bg-emerald-500', trend: '+12%', isUp: true },
        { label: 'Total Sales', value: '$12,450', icon: faChartLine, color: 'bg-blue-500', trend: '+8.5%', isUp: true },
        { label: 'Customers', value: '1,240', icon: faUsers, color: 'bg-purple-500', trend: '-3%', isUp: false },
        { label: 'Active Orders', value: '45', icon: faShoppingCart, color: 'bg-orange-500', trend: '+24%', isUp: true },
    ];

    const menuItems = [
        // { id: 'dashboard', label: 'Overview', icon: faGauge },
        { id: 'products', label: 'My Products', icon: faBox },
        { id: 'orders', label: 'Orders', icon: faShoppingCart },
        { id: 'customers', label: 'Customers', icon: faUsers },
        { id: 'settings', label: 'Settings', icon: faCog },
    ];

    if (!products) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-[#f5f5f0]'>
                <div className='text-center'>
                    <img src={loading_gif} alt="loading..." className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium animate-pulse">Loading Workspace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar - Desktop Only for now */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
                <div className="p-6 border-b border-gray-50">
                    <div className="flex items-center gap-3 text-emerald-800 italic font-serif text-2xl font-bold">
                        SilkRoad<span className="text-xs bg-emerald-50 text-emerald-700 not-italic font-sans px-2 py-1 rounded-md uppercase tracking-wider ml-1">Pro</span>
                    </div>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                                activeTab === item.id 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={item.icon} className={`text-lg ${activeTab === item.id ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            {activeTab === item.id && <FontAwesomeIcon icon={faChevronRight} className="text-xs" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-gray-900 truncate tracking-tight">{user?.name}</p>
                                <p className="text-[10px] text-gray-500 truncate">Licensed Seller</p>
                            </div>
                        </div>
                        <button className="w-full text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-100 py-2 rounded-lg shadow-sm transition-all duration-200">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 overflow-auto">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                                <p className="text-xs text-gray-500">Managing your business as <span className="text-emerald-600 font-medium">@{user?.name?.toLowerCase().replace(/\s+/g, '')}</span></p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs transition-colors group-focus-within:text-emerald-500" />
                                    <input 
                                        type="text" 
                                        placeholder="Quick filter..."
                                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 w-full md:w-64 font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-lg">
                                    <FontAwesomeIcon icon={faPlus} className="text-emerald-400" />
                                    <span>New Item</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
                    {/* Stats Section - only show if on 'dashboard' or 'products' */}
                    {(activeTab === 'dashboard' || activeTab === 'products') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`${stat.color} bg-opacity-10 p-2.5 rounded-xl`}>
                                            <FontAwesomeIcon icon={stat.icon} className={`text-md ${stat.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${stat.isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                                            <FontAwesomeIcon icon={stat.isUp ? faArrowUp : faArrowDown} size="xs" />
                                            {stat.trend}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{stat.label}</h3>
                                        <p className="text-xl font-black text-gray-900 mt-0.5">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Products Management View */}
                    {activeTab === 'products' ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <h2 className="text-sm font-bold text-gray-900">Inventory Status</h2>
                                </div>
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{filteredProducts?.length} Recorded Units</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Item Details</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Categorization</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Pricing Model</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Avail. Status</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] text-right">Admin Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredProducts?.length > 0 ? (
                                            filteredProducts.map((product) => (
                                                <tr key={product._id} className="group hover:bg-emerald-50/30 transition-colors duration-200">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative">
                                                                {product.images?.[0] ? (
                                                                    <img 
                                                                        src={product.images[0]} 
                                                                        alt={product.name} 
                                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                        onerror={(e) => e.target.src = 'https://via.placeholder.com/150?text=NA'}
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                        <FontAwesomeIcon icon={faBox} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-bold text-gray-900 text-sm truncate">{product.name}</div>
                                                                <div className="text-[10px] text-gray-400 truncate max-w-[150px] font-medium tracking-tight">ID: {product._id.slice(-8).toUpperCase()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-gray-100 text-gray-600 uppercase">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-black text-gray-900 text-sm">
                                                            ${product.price?.toLocaleString()}
                                                        </div>
                                                        {product.discount > 0 && (
                                                            <div className="text-[10px] font-bold text-emerald-600">PROMO -{product.discount}%</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                                                            product.inStock 
                                                                ? 'text-emerald-700 bg-emerald-50' 
                                                                : 'text-red-700 bg-red-50'
                                                        }`}>
                                                            <div className={`h-1.5 w-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                            {product.inStock ? 'Active' : 'Empty'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button title="Edit Item" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                                                <FontAwesomeIcon icon={faEdit} size="sm" />
                                                            </button>
                                                            <button title="Delete Item" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                                                                <FontAwesomeIcon icon={faTrash} size="sm" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-20 text-center">
                                                    <FontAwesomeIcon icon={faBox} className="text-4xl text-gray-100 mb-4" />
                                                    <p className="font-bold text-gray-900 text-sm">No results match your criteria</p>
                                                    <p className="text-xs text-gray-400 mt-1">Try refining your search or create a new entry.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                            <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <FontAwesomeIcon icon={faGauge} className="text-2xl text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 capitalize">{activeTab} View Under Construction</h3>
                            <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">We're building a powerful interface for your {activeTab}. Check back soon for updates.</p>
                            <button 
                                onClick={() => setActiveTab('products')}
                                className="mt-8 text-sm font-black text-emerald-600 hover:text-emerald-700"
                            >
                                Back to Products
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;

