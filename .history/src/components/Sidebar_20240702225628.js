import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../actions/auth';

import {
    ScheduleOutlined,
    TruckOutlined,
    LineChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

function getItem(label, key, icon, link, onClick) {
    return {
        key,
        icon,
        label,
        link,
        onClick,
    };
}

const Sidebar = ({ collapsed, setCollapsed }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const items = [
        getItem('BestMatch', '/transporteur/TransporteurBestmatch', <ScheduleOutlined />, '/transporteur/TransporteurBestmatch'),
        getItem('Ajouter Vehicule', '/transporteur/AjouterVehicule', <TruckOutlined />, '/transporteur/AjouterVehicule'),
        getItem('Statistique', '/transporteur/statistique', <LineChartOutlined />, '/transporteur/statistique'),
        getItem('Se déconnecter ', 'logout', <LogoutOutlined />, null, handleLogout),
    ];

    return (
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                    {!collapsed && <span style={{ marginLeft: '10px', color: 'white' }}>CharJi</span>}
                </div>
                <hr style={{ color: 'gray' }} />
                <Menu
                    theme="dark"
                    selectedKeys={[selectedKey]}
                    mode="inline"
                >
                    {items.map(item => (
                        <Menu.Item
                            className='my-3'
                            key={item.key}
                            icon={item.icon}
                            onClick={() => {
                                if (item.link) {
                                    setSelectedKey(item.key);
                                }
                                if (item.onClick) {
                                    item.onClick();
                                }
                            }}
                        >
                            {item.link ? (
                                <Link style={{ textDecoration: 'none' }} to={item.link}>{item.label}</Link>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
    );
};

export default Sidebar;
