const productionTime = [...document.querySelectorAll('.production-time')]
const producedParts = [...document.querySelectorAll('.produced-parts')]
const id = [...document.querySelectorAll('.robot-id')]

const productionTimeValues = productionTime.map(value => value.innerHTML)
const producedPartsValues = producedParts.map(value => value.innerHTML)
const idValues = id.map(value => (`ID: ${value.innerHTML}`))

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const barColors = [];

for (let i = 1; i <= idValues.length; i++) {
    barColors.push(getRandomColor())
}

new Chart("pieChart", {
    type: "pie",
    data: {
        labels: idValues,
        datasets: [{
            backgroundColor: barColors,
            data: producedPartsValues
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        title: {
            display: true,
            text: "Ilość części"
        },
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            }

        }
    }
});

new Chart("barChart", {
    type: "bar",
    data: {
        labels: idValues,
        datasets: [{
            backgroundColor: barColors,
            data: productionTimeValues
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Czas produkcji"
        },
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            }

        }
    }
});