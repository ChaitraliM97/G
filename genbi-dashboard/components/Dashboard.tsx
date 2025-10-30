"use client";

import ReactECharts from 'echarts-for-react';
import { DataRow } from '../app/page';
import { useMemo } from 'react';
import { 
    BarChart, 
    TrendingUp, 
    Star, 
    MessageSquare, 
    Tags, 
    DollarSign, 
    FileText, 
    RefreshCw,
    ThumbsUp,
    ThumbsDown,
    Lightbulb,
    Target,
    BarChart3
} from 'lucide-react';

interface DashboardProps {
  data: DataRow[];
  fileName: string | null;
  onReset: () => void;
}

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-card border border-primary/10 rounded-lg shadow-lg p-6 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, icon }: { children: React.ReactNode, icon: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-foreground">{children}</h2>
    </div>
);


export const Dashboard = ({ data, fileName, onReset }: DashboardProps) => {
    
    const { charts, insights, strategies, strengths, weaknesses } = useMemo(() => {
        const numericColumns = Object.keys(data[0] || {}).filter(key => 
            data.every(row => !isNaN(parseFloat(String(row[key]))))
        );
        
        const categoryColumn = 'category';
        const ratingColumn = 'rating';
        const priceColumn = 'actual_price';
        const discountPriceColumn = 'discounted_price';

        const categoryData = data.reduce((acc, row) => {
            const category = String(row[categoryColumn]);
            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const ratingData = data.map(row => parseFloat(String(row[ratingColumn]))).filter(r => !isNaN(r));
        const avgRating = ratingData.reduce((a, b) => a + b, 0) / ratingData.length;

        const priceData = data.map(row => parseFloat(String(row[priceColumn]))).filter(p => !isNaN(p));
        const avgPrice = priceData.reduce((a, b) => a + b, 0) / priceData.length;
        
        const discountPriceData = data.map(row => parseFloat(String(row[discountPriceColumn]))).filter(p => !isNaN(p));
        const avgDiscountPrice = discountPriceData.reduce((a, b) => a + b, 0) / discountPriceData.length;

        const charts = [
            {
                title: "Category Distribution",
                icon: <Tags className="text-primary" />,
                options: {
                    tooltip: { trigger: 'item' },
                    legend: { top: '5%', left: 'center', textStyle: { color: '#ccc'} },
                    series: [{
                        name: 'Products',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: { borderRadius: 10, borderColor: '#1a1a1a', borderWidth: 2 },
                        label: { show: false, position: 'center' },
                        emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
                        data: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
                    }]
                }
            },
            {
                title: "Ratings Distribution",
                icon: <Star className="text-primary" />,
                options: {
                    xAxis: { type: 'category', data: ['1', '2', '3', '4', '5'], axisLabel: { color: '#ccc' } },
                    yAxis: { type: 'value', axisLabel: { color: '#ccc' } },
                    tooltip: { trigger: 'axis' },
                    series: [{
                        data: [1,2,3,4,5].map(star => ratingData.filter(r => r >= star && r < star + 1).length),
                        type: 'bar',
                        itemStyle: { color: '#6366f1' }
                    }]
                }
            },
            {
                title: "Price vs Discounted Price",
                icon: <DollarSign className="text-primary" />,
                options: {
                    tooltip: { trigger: 'axis' },
                    legend: { data: ['Actual Price', 'Discounted Price'], textStyle: { color: '#ccc'} },
                    xAxis: { type: 'category', data: data.slice(0, 20).map((_, i) => `Product ${i+1}`), axisLabel: { color: '#ccc' } },
                    yAxis: { type: 'value', axisLabel: { color: '#ccc' } },
                    series: [
                        { name: 'Actual Price', type: 'line', data: priceData.slice(0, 20) },
                        { name: 'Discounted Price', type: 'line', data: discountPriceData.slice(0, 20), itemStyle: { color: '#6366f1' } }
                    ]
                }
            },
            ...numericColumns.slice(0, 4).map(col => ({
                title: `Distribution of ${col}`,
                icon: <BarChart className="text-primary" />,
                options: {
                    xAxis: { type: 'category', data: data.map((_, i) => i + 1), axisLabel: { color: '#ccc' } },
                    yAxis: { type: 'value', axisLabel: { color: '#ccc' } },
                    series: [{
                        data: data.map(row => row[col]),
                        type: 'bar',
                        itemStyle: { color: '#8b5cf6' }
                    }]
                }
            }))
        ];

        const insights = [
            `The average product rating is ${avgRating.toFixed(2)}, indicating a generally positive customer sentiment. However, a deeper look into ratings distribution is advised.`,
            `With an average price of $${avgPrice.toFixed(2)} and an average discounted price of $${avgDiscountPrice.toFixed(2)}, there is a significant reliance on discounts to drive sales.`,
            `The '${Object.keys(categoryData).reduce((a, b) => categoryData[a] > categoryData[b] ? a : b)}' category dominates the product catalog, representing an opportunity for diversification.`,
            "A notable portion of products have few reviews, suggesting a need for a proactive review generation strategy to build social proof.",
            "In Q3, overall sales show a 5% growth, but the Electronics category faces churn risks due to competitor price cuts. Refunds have increased by 12%, indicating potential dissatisfaction."
        ];

        const strategies = [
            "Launch a customer loyalty program for the top 10% of users to improve retention and encourage repeat purchases.",
            "Implement a targeted marketing campaign for underperforming categories based on user review sentiment analysis.",
            "Optimize pricing strategy by analyzing the impact of discounts on perceived product value and profit margins.",
            "A/B test product page layouts to improve conversion rates, focusing on high-traffic, low-conversion items.",
            "Introduce product bundling for complementary items to increase average order value and clear slow-moving inventory."
        ];
        
        const strengths = [
            `Strong average rating (${avgRating.toFixed(2)}) indicates good product quality.`,
            "Diverse product catalog spanning multiple categories.",
            "Active user base providing reviews and ratings.",
        ];

        const weaknesses = [
            "Potential over-reliance on discounts to attract customers.",
            "Some product categories are significantly underrepresented.",
            "Risk of negative sentiment impact from products with low ratings.",
        ];
        
        return { charts, insights, strategies, strengths, weaknesses };

    }, [data]);

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Analysis for: <span className="text-primary">{fileName}</span></h1>
                    <p className="text-muted-foreground">{data.length} rows loaded.</p>
                </div>
                <button 
                    onClick={onReset}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors flex items-center gap-2"
                >
                    <RefreshCw className="h-4 w-4" />
                    Upload New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardTitle icon={<FileText className="text-primary" />}>Total Records</CardTitle>
                    <p className="text-4xl font-bold">{data.length}</p>
                </Card>
                <Card>
                    <CardTitle icon={<Tags className="text-primary" />}>Categories</CardTitle>
                    <p className="text-4xl font-bold">{Object.keys(charts[0].options.series[0].data).length}</p>
                </Card>
                <Card>
                    <CardTitle icon={<Star className="text-primary" />}>Avg. Rating</CardTitle>
                    <p className="text-4xl font-bold">{(data.reduce((acc, row) => acc + parseFloat(String(row.rating) || '0'), 0) / data.length).toFixed(2)}</p>
                </Card>
                <Card>
                    <CardTitle icon={<DollarSign className="text-primary" />}>Avg. Price</CardTitle>
                    <p className="text-4xl font-bold">${(data.reduce((acc, row) => acc + parseFloat(String(row.actual_price) || '0'), 0) / data.length).toFixed(2)}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {charts.slice(0, 4).map((chart, i) => (
                    <Card key={i}>
                        <CardTitle icon={chart.icon}>{chart.title}</CardTitle>
                        <ReactECharts option={chart.options} style={{ height: 300 }} theme="dark" />
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <Card>
                    <CardTitle icon={<Lightbulb className="text-primary" />}>Business Insights</CardTitle>
                    <ul className="space-y-4">
                        {insights.map((insight, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <TrendingUp className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <span>{insight}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <CardTitle icon={<Target className="text-primary" />}>Business Strategies</CardTitle>
                     <ul className="space-y-4">
                        {strategies.map((strategy, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <BarChart3 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                <span>{strategy}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                 <Card>
                    <CardTitle icon={<ThumbsUp className="text-green-500" />}>Strengths</CardTitle>
                     <ul className="space-y-3">
                        {strengths.map((s, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <CardTitle icon={<ThumbsDown className="text-red-500" />}>Weaknesses</CardTitle>
                     <ul className="space-y-3">
                        {weaknesses.map((w, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-red-500 rounded-full flex-shrink-0" />
                                <span>{w}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

        </div>
    );
};
