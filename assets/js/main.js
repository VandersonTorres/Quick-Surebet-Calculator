document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const resultDiv = document.querySelector(".result");

    function calculateArbitrage(funds, odd1, odd2) {
        const isHedge = (1 / odd1) + (1 / odd2) < 1;

        if (!isHedge) {
            resultDiv.innerHTML = "<h3> 🔴 As odds não oferecem possibilidade de arbitragem.</h3>";
            resultDiv.classList.remove("result-green", "result-yellow");
            resultDiv.classList.add("result-red");
            return;
        }

        const wager1 = Math.round(funds / (1 + odd1 / odd2));
        const wager2 = Math.round(funds - wager1);

        const profitTarget1 = (wager1 * odd1) - wager2 - wager1;
        const profitTarget2 = (wager2 * odd2) - wager1 - wager2;

        if (profitTarget1 > 0 && profitTarget2 > 0) {
            const percentProfit1 = (profitTarget1 / funds) * 100;
            const percentProfit2 = (profitTarget2 / funds) * 100;
            const averagePercentProfit = ((percentProfit1 + percentProfit2) / 2).toFixed(1);

            const result = `
                <h3> ✅ ARBITRAGEM CONFIRMADA</h3>
                <p> ➡️ '<b>ODD ${odd1}</b>': R$ ${wager1.toFixed(2)}</p>
                <p> ➡️ '<b>ODD ${odd2}</b>': R$ ${wager2.toFixed(2)}</p>
                <p>Lucro esperado: R$ ${profitTarget1.toFixed(2)} à ${profitTarget2.toFixed(2)}</p>
                <p>Porcentagem de lucro médio: ${averagePercentProfit}%</p>
            `;
            resultDiv.innerHTML = result;
            resultDiv.classList.remove("result-red", "result-yellow");
            resultDiv.classList.add("result-green");
        } else {
            resultDiv.innerHTML = "<h3> 🔴 O resultado final não é satisfatório.</h3>";
            resultDiv.classList.remove("result-green", "result-yellow");
            resultDiv.classList.add("result-red");
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const funds = parseFloat(document.querySelector(".funds").value);
        const odd1 = parseFloat(document.querySelector(".odd-1").value);
        const odd2 = parseFloat(document.querySelector(".odd-2").value);

        if (isNaN(funds) || isNaN(odd1) || isNaN(odd2)) {
            resultDiv.innerHTML = "<h3> 🟡 POR FAVOR, INSIRA VALORES VÁLIDOS (NÚMEROS REAIS).</h3>";
            resultDiv.classList.remove("result-green", "result-red");
            resultDiv.classList.add("result-yellow");
            return;
        }

        calculateArbitrage(funds, odd1, odd2);
    });
});
