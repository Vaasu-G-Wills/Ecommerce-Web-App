import type { Coupon, UserAddress } from '../types';

export interface CategoryDefinition {
  id: string;
  name: string;
  iconName: string; // lucide icon name reference
  description: string;
  subCategories: string[];
  popularBrands: string[];
  specFilterKeys: {
    label: string;
    key: string;
    options: string[];
  }[];
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'laptops',
    name: 'Laptops & MacBooks',
    iconName: 'Laptop',
    description: 'High-performance ultrabooks, creator rigs, MacBooks, and hardcore gaming battle laptops.',
    subCategories: ['Gaming Laptops', 'Ultrabooks', 'MacBooks', 'Workstation PCs'],
    popularBrands: ['Apple', 'ASUS', 'Lenovo', 'HP', 'Dell', 'Razer', 'MSI', 'Acer'],
    specFilterKeys: [
      { label: 'Processor', key: 'cpu', options: ['Apple M4 Max', 'Apple M3 Pro', 'Intel Core i9-14900HX', 'Intel Core Ultra 7', 'AMD Ryzen 9 7945HX'] },
      { label: 'RAM Installed', key: 'ram', options: ['16GB', '32GB', '64GB', '128GB'] },
      { label: 'Display Refresh Rate', key: 'refreshRate', options: ['60Hz Liquid Retina', '120Hz ProMotion', '165Hz', '240Hz OLED'] },
      { label: 'Graphics Card', key: 'gpu', options: ['NVIDIA RTX 4090', 'NVIDIA RTX 4080', 'NVIDIA RTX 4070', 'Apple 40-Core GPU'] },
    ],
  },
  {
    id: 'components',
    name: 'PC Components',
    iconName: 'Cpu',
    description: 'Build or upgrade your dream desktop PC with cutting-edge GPUs, high-clock CPUs, and motherboards.',
    subCategories: ['Graphics Cards (GPUs)', 'Processors (CPUs)', 'Motherboards', 'Power Supplies (PSUs)', 'Liquid Cooling & Cases'],
    popularBrands: ['NVIDIA', 'ASUS ROG', 'Corsair', 'AMD', 'Intel', 'Gigabyte', 'MSI', 'Seasonic'],
    specFilterKeys: [
      { label: 'Component Type', key: 'componentType', options: ['GPU', 'CPU', 'Motherboard', 'PSU', 'Cooler'] },
      { label: 'VRAM / Core Count', key: 'capacity', options: ['24GB GDDR6X', '16GB GDDR6X', '24-Core / 32-Thread', '16-Core / 32-Thread'] },
      { label: 'Power Rating / Socket', key: 'power', options: ['1000W 80+ Platinum', '850W 80+ Gold', 'LGA 1700', 'AM5 Socket'] },
    ],
  },
  {
    id: 'monitors',
    name: 'Monitors & Displays',
    iconName: 'Monitor',
    description: 'Immersive OLEDs, super-ultrawide curved displays, and 4K professional color-accurate monitors.',
    subCategories: ['High-Refresh Gaming OLEDs', 'Ultrawide Curved', '4K UHD Professional', 'Portable USB-C Displays'],
    popularBrands: ['ASUS ROG', 'Samsung Odyssey', 'LG UltraGear', 'BenQ', 'Alienware', 'Dell'],
    specFilterKeys: [
      { label: 'Screen Size', key: 'screenSize', options: ['27-inch', '32-inch', '34-inch Ultrawide', '49-inch Super Ultrawide'] },
      { label: 'Resolution', key: 'resolution', options: ['4K UHD (3840x2160)', 'QHD (2560x1440)', 'Dual QHD (5120x1440)'] },
      { label: 'Panel Type', key: 'panel', options: ['QD-OLED', 'WOLED', 'Fast IPS', 'Mini-LED'] },
      { label: 'Refresh Rate', key: 'refreshRate', options: ['144Hz', '175Hz', '240Hz', '360Hz'] },
    ],
  },
  {
    id: 'peripherals',
    name: 'Peripherals & Input',
    iconName: 'Keyboard',
    description: 'Custom mechanical keyboards, wireless esports gaming mice, audiophile headsets, and 4K streaming webcams.',
    subCategories: ['Mechanical Keyboards', 'Wireless Gaming Mice', 'Gaming Headsets & DACs', 'Streaming Webcams & Mics'],
    popularBrands: ['Logitech G', 'Razer', 'Keychron', 'SteelSeries', 'HyperX', 'ASUS ROG', 'Elgato'],
    specFilterKeys: [
      { label: 'Switch Type / Sensor', key: 'switchOrSensor', options: ['Hot-Swappable Red Linear', 'Tactile Brown Switches', 'Hero 25K Sensor', 'Focus Pro 30K'] },
      { label: 'Connectivity', key: 'connectivity', options: ['2.4GHz Lightspeed Wireless', 'Bluetooth 5.3', 'Wired USB-C Detachable'] },
      { label: 'RGB Backlighting', key: 'rgb', options: ['Per-Key RGB', 'South-Facing RGB', 'Minimalist White LED', 'No Backlight'] },
    ],
  },
  {
    id: 'storage',
    name: 'Storage & Memory',
    iconName: 'HardDrive',
    description: 'Blazing fast PCIe Gen 5 NVMe SSDs, extreme low-latency DDR5 RAM kits, and rugged external drives.',
    subCategories: ['NVMe M.2 SSDs', 'DDR5 RAM Kits', 'External Portable SSDs', 'High-Capacity NAS HDDs'],
    popularBrands: ['Samsung', 'WD Black', 'Corsair', 'G.Skill', 'Crucial', 'Kingston', 'Seagate'],
    specFilterKeys: [
      { label: 'Storage / RAM Capacity', key: 'storageSize', options: ['1TB', '2TB', '4TB', '32GB Kit (2x16GB)', '64GB Kit (2x32GB)'] },
      { label: 'Speed Rating', key: 'speed', options: ['14,000 MB/s Gen5', '7,450 MB/s Gen4', '6000MT/s CL30', '6400MT/s CL32'] },
    ],
  },
  {
    id: 'networking',
    name: 'Networking & Smart Tech',
    iconName: 'Wifi',
    description: 'Multi-Gigabit Wi-Fi 7 Tri-band mesh systems, enterprise routers, Thunderbolt 4 docks, and pure sine UPS backup.',
    subCategories: ['Wi-Fi 7 Mesh Routers', 'Thunderbolt 4 Docking Stations', 'UPS Battery Backups', 'Managed Switches'],
    popularBrands: ['ASUS ROG Rapture', 'TP-Link Archer', 'Netgear Orbi', 'CalDigit', 'APC', 'CyberPower'],
    specFilterKeys: [
      { label: 'Wi-Fi Standard / Protocol', key: 'protocol', options: ['Wi-Fi 7 (802.11be)', 'Wi-Fi 6E Tri-Band', 'Thunderbolt 4 (40Gbps)'] },
      { label: 'Port Speed', key: 'portSpeed', options: ['10 Gbps Ethernet', '2.5 Gbps Ethernet', '100W Power Delivery'] },
    ],
  },
];

export const INITIAL_ADDRESSES: UserAddress[] = [
  {
    id: 'addr-1',
    fullName: 'Aarav Sharma',
    street: '402, Prestige Towers, Koramangala 6th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560095',
    phone: '+91 98765 43210',
    isDefault: true,
    addressType: 'Home',
  },
  {
    id: 'addr-2',
    fullName: 'Aarav Sharma (Office)',
    street: 'Level 8, Cyberhub IT Park, BKC (Bandra-Kurla Complex)',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400051',
    phone: '+91 98765 43210',
    isDefault: false,
    addressType: 'Work',
  },
  {
    id: 'addr-3',
    fullName: 'Rohan Gupta',
    street: '14/B, Connaught Place Outer Circle',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    phone: '+91 98111 22334',
    isDefault: false,
    addressType: 'Home',
  },
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'TECHPRO10',
    discountPercentage: 10,
    description: 'Flat 10% instant discount on all Computer & Electronics hardware.',
    minOrderValue: 5000,
  },
  {
    code: 'PRIME2026',
    discountPercentage: 15,
    description: 'Special 15% discount for PrimeTech India VIP Members (Max discount up to ₹15,000).',
    minOrderValue: 15000,
  },
  {
    code: 'WELCOME5',
    discountPercentage: 5,
    description: '5% welcome discount on your first PrimeTech order.',
    minOrderValue: 1000,
  },
];
