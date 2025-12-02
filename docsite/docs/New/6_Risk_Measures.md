---
id: risk-measures
title: Interest-Rate Risk Measures
sidebar_label: Risk Measures
---

# Interest-Rate Risk Measures

This chapter summarizes the core interest-rate sensitivities used across  
fixed-income products, swaps, risk reports, and pricing systems.

These measures quantify how **discount factors** and **present value** change when  
interest rates move.

---

# 1. DV01 / PV01 (Dollar Value of 1 Basis Point)

## Definition

DV01 (or PV01) measures **absolute price change** from a 1 bp (0.01%) parallel shift in rates:

$$
DV01
\approx
\frac{\partial P}{\partial r}
\times
0.0001
$$

For a bond or swap with price $P$ and modified duration $D_{\text{mod}}$:

$$
DV01
\approx
D_{\text{mod}} \cdot P \cdot 0.0001
$$

Interpretation:

- “How many dollars do I gain/lose if rates rise by 1 bp?”
- Trader-friendly risk metric
- Used for hedging and P&L explanations

---

# 2. Duration (First-Order Sensitivity)

## 2.1 Macaulay Duration

Present-value weighted average cash-flow timing:

$$
D
=
\frac{
  \sum t_i CF_i DF(0, t_i)
}{
  P
}
$$

Interpretation:

- Longer cash flows = higher duration  
- Zero-coupon bond → duration equals maturity  

---

## 2.2 Modified Duration (True Sensitivity)

Converted into price sensitivity to yield:

$$
D_{\text{mod}}
=
-\frac{1}{P}
\frac{\partial P}{\partial r}
$$

Price change approximation:

$$
\frac{\Delta P}{P}
\approx
- D_{\text{mod}} \Delta r
$$

---

# 3. Convexity (Second-Order Sensitivity)

Convexity quantifies the **curvature** of the price-yield curve:

$$
Conv
=
\frac{1}{P}
\frac{\partial^2 P}{\partial r^2}
$$

Second-order Taylor approximation:

$$
\frac{\Delta P}{P}
\approx
- D_{\text{mod}} \Delta r
+
\frac{1}{2}
Conv (\Delta r)^2
$$

Properties:

- Convexity is positive for standard bonds  
- Higher convexity improves P&L in volatile markets  
- Zero-coupon bonds have the highest convexity  

---

# 4. Parallel DV01 (Whole-Curve Sensitivity)

A **parallel shift** moves the entire curve up/down by 1 bp.

Parallel DV01:

$$
DV01_{\text{parallel}}
=
\sum_{i}
DV01_i
$$

Limitations:

- Real yield curves rarely move in perfect parallel  
- Does not capture curve steepening/flattening risks  

Thus we use **key rate DV01**.

---

# 5. Key Rate DV01 (Curve Shape Risk)

Key rate DV01 isolates sensitivity to **one maturity bucket**:

- 2Y  
- 5Y  
- 10Y  
- 30Y  

Definition:

$$
KR01_i
=
-
\frac{\partial P}{\partial k_i}
\times
0.0001
$$

Where $k_i$ is the key curve node (e.g., 5Y swap rate).

Interpretation:

- “If only the 5Y point moves by 1 bp, how much does my PV change?”
- Reveals exposure to **steepener** / **flattener** risks  
- Used in trading desks and all risk engines (NxRisk, Murex, Bloomberg)  

---

# 6. Bucketed DV01 (Full Curve Decomposition)

Bucketed DV01 breaks parallel DV01 into contributions by curve segment:

$$
DV01_{\text{parallel}}
=
\sum_i KR01_i
$$

This shows **where** the instrument's risk lies:

- Short-end (cash-like)  
- Belly (5Y–10Y area)  
- Long-end (duration-heavy)  

Used for:

- Curve hedging  
- Reporting to risk managers  
- Explaining P&L in multi-factor rate moves  

---

# 7. Swap-Specific Risk Measures

For swaps, PV01 of fixed leg is:

$$
PV01_{\text{fixed}}
=
\sum_{i}
\Delta_i \cdot DF(0, t_i)
$$

Swap PV sensitivity:

$$
PV_{\text{swap}}
=
PV01_{\text{fixed}}
\cdot
(S_{\text{mkt}} - S_{\text{par}})
$$

Where:

- $S_{\text{mkt}}$ = new market swap rate  
- $S_{\text{par}}$ = original par swap rate  

Swap KR01 often shows concentrated risk at maturities equal to:

- swap fixed leg maturity  
- forward-start segments  
- projection vs discount curve differences

---

# 8. Summary Table

| Measure | Mathematical Form | Meaning |
|--------|-------------------|---------|
| DV01 | $ \partial P/\partial r \times 0.0001 $ | Dollar change for 1 bp parallel move |
| PV01 | Same as DV01 | Alternate market name |
| Duration | $ -\frac{1}{P}\partial P/\partial r $ | First-order sensitivity |
| Convexity | $ \frac{1}{P}\partial^2 P/\partial r^2 $ | Second-order sensitivity |
| Key Rate DV01 | $ -\partial P/\partial k_i \times 0.0001 $ | Sensitivity to curve buckets |
| Bucketed DV01 | Sum of KR01 | Decomposition of total DV01 |

---

# 9. Fixed-Income Risk Mindset

A complete IR risk view requires:

- **Parallel DV01** → overall exposure  
- **Key Rate DV01** → curve shape exposure  
- **Convexity** → nonlinearity in large moves  
- **Duration** → percentage sensitivity  
- **DV01** → dollar sensitivity  

Together they form the standard risk toolkit used in industry.
