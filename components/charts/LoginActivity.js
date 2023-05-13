import dynamic from 'next/dynamic';
import React from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

class LoginActivity extends React.Component {
    state = {
        options: {
            chart: {
                toolbar: {
                    show: false
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', "Mar", 'Apr', "May", 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {
                show: false
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true,
                    }
                },
                yaxis: {
                    lines: {
                        show: true,
                    }
                }
            },
            title: {
                text: "Login Activity"
            }
        },

        series: [
            {
                name: "Logins",
                data: [30, 40, 45, 50, 49, 60, 70, 91, 30, 40, 45, 50],
            }
        ]
    };


    render() {
        return (
            <div className='relative p-0'>
                <Chart series={this.state.series} options={this.state.options} type="line" width={500} height={290} />
            </div>
        )
    }

}

export default LoginActivity;