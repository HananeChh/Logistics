import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import { transporteurStat } from '../actions/auth';
import Navbar from './Navbar';
import { Row, Col, Layout, DatePicker, Card } from 'antd';
import Sidebar from './Sidebar';

const { RangePicker } = DatePicker;

const ChartComponent = () => {
    const chartRef = useRef(null);
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    const chartRef4 = useRef(null);
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();
    const [stats, setStats] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dispatch(transporteurStat(startDate, endDate));
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (startDate && endDate) {
            fetchStats();
        }
    }, [dispatch, startDate, endDate]);

    useEffect(() => {
        if (stats) {
            const ctx = chartRef.current.getContext('2d');
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(stats.expeditions_par_type_marchandise),
                    datasets: [{
                        label: 'Nombre des expéditions par type de marchandise',
                        data: Object.values(stats.expeditions_par_type_marchandise),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            const ctx1 = chartRef1.current.getContext('2d');
            if (chartRef1.current.chart) {
                chartRef1.current.chart.destroy();
            }
            chartRef1.current.chart = new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: Object.keys(stats.expeditions_par_statut),
                    datasets: [{
                        label: 'Expéditions par statut',
                        data: Object.values(stats.expeditions_par_statut),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4,
                    }],
                },
            });

            const ctx2 = chartRef2.current.getContext('2d');
            if (chartRef2.current.chart) {
                chartRef2.current.chart.destroy();
            }
            chartRef2.current.chart = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['Volume total', 'Poids total'],
                    datasets: [{
                        label: "Nombre d'expéditions",
                        data: [stats.volume_total, stats.poids_total],
                        backgroundColor: [
                            'rgb(255, 205, 86)',
                            'rgb(153, 102, 255)',
                        ],
                        hoverOffset: 4,
                    }],
                },
            });

            const ctx3 = chartRef3.current.getContext('2d');
            if (chartRef3.current.chart) {
                chartRef3.current.chart.destroy();
            }

            chartRef3.current.chart = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: [...Object.keys(stats.villes_depart), ...Object.keys(stats.villes_arrivee)],

                    datasets: [{
                        label: 'Villes de départ',
                        data: [...Object.values(stats.villes_depart).map(Math.abs), ...Array(Object.values(stats.villes_arrivee).length).fill(null)],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1
                    }, {
                        label: 'Villes d\'arrivée',
                        data: [...Array(Object.values(stats.villes_depart).length).fill(null), ...Object.values(stats.villes_arrivee)],
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderColor: 'rgb(255, 205, 86)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                callback: function (value, index, values) {
                                    // Si l'index correspond à une ville de départ, retournez le nom de la ville
                                    if (index < Object.values(stats.villes_depart).length) {
                                        return Object.keys(stats.villes_depart)[index];
                                    } else { // Sinon, retournez le nom de la ville d'arrivée
                                        return Object.keys(stats.villes_arrivee)[index - Object.values(stats.villes_depart).length];
                                    }
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });


            const months = Object.keys(stats.revenus_par_mois);
            const revenues = Object.values(stats.revenus_par_mois);

            const ctx4 = chartRef4.current.getContext('2d');
            if (chartRef4.current.chart) {
                chartRef4.current.chart.destroy();
            }
            chartRef4.current.chart = new Chart(ctx4, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Revenus par mois',
                        data: revenues,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 3,
                        fill: true
                    }],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Mois'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Revenus'
                            }
                        }
                    }
                }
            });

        }
    }, [stats]);


    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            setStartDate(dates[0].format('YYYY-MM-DD'));
            setEndDate(dates[1].format('YYYY-MM-DD'));
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', height: '100%', backgroundColor: "white" }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div class="col">
                <Navbar class="row" activeClass="dashboard"/>
                <div className='   m-3'>
                    <Row gutter={[16, 16]} >
                        <Col span={24} >
                            <Card title={
                                <>
                                    Sélectionner une période
                                    <RangePicker id="dateRangePicker" className="mx-3" onChange={handleDateChange} />

                                </>
                            } >
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12}>
                                        <Card title="Répartition des expéditions par type de marchandise">
                                            <canvas id="mixedChart" ref={chartRef}></canvas>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Card title="Nombre d'expéditions par ville de départ et d'arrivée">
                                            <canvas id="expeditionsTypeMarchandiseChart" ref={chartRef3}></canvas>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]} className='mt-3'>

                                    <Col xs={24} sm={6}>
                                        <Card title={<p>Répartition des expéditions <br />par statut</p>}>
                                            <canvas id="expeditionsStatutChart" ref={chartRef1}></canvas>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={6}>
                                        <Card title={<p>Répartition des expéditions <br /> par poids et volume total</p>} >
                                            <canvas id="chartVolumeWeight" ref={chartRef2}></canvas>
                                        </Card>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Card title="Revenues par mois">
                                            <canvas id="revenusChart" ref={chartRef4}></canvas>
                                        </Card>
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                    </Row>

                </div>
            </div>

        </Layout>

    );
};

export default ChartComponent;
