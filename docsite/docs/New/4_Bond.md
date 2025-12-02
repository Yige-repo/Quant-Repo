---
id: bonds
title: Bonds & Sensitivities
sidebar_label: Bonds
---

# Bonds & Interest-Rate Sensitivities

This chapter covers the pricing of fixed-income instruments and their key rate sensitivities:  
duration, DV01, convexity, and key-rate DV01.

All pricing follows the universal rule:

$$
P = \sum_{i=1}^{n} CF_i \cdot DF(0, t_i)
$$

---

# 1. Zero-Coupon Bonds

A zero-coupon bond pays a single cash flow $N$ at maturity $T$:

$$
P = N \cdot DF(0, T)
$$

Where:

$$
DF(0, T) = e^{-R(0, T) T}
$$

Zero bonds are the building blocks for all curve construction and pricing.

---

# 2. Fixed Coupon Bonds

A fixed-rate bond pays:

- Coupons: $cN\Delta_i$  
- Principal: $N$ at maturity  

Price:

$$
P
=
\sum_{i=1}^{n}
cN\Delta_i \cdot DF(0, t_i)
+
N \cdot DF(0, T)
$$

---

# 3. Clean Price vs Dirty Price

**Dirty price** = actual cash paid:

$$
P_\text{dirty} = P_\text{clean} + \text{Accrued Interest}
$$

Accrued interest:

$$
AI = cN \times \frac{\text{days since last payment}}{\text{days in coupon period}}
$$

Markets quote **clean price**;  
valuation systems compute **dirty price**.

---

# 4. Yield vs Price (Bond Yield)

Yield is defined as the single rate $y$ that satisfies:

$$
P
=
\sum_{i=1}^{n}
\frac{CF_i}{(1 + y)^{t_i}}
$$

Yield is:

- A **market quoting convention**  
- Not used in quant pricing  
- Only used for communication and analytics  

Quantitative pricing uses **zero rates** and **discount factors**, not yield.

---

# 5. Duration (First-Order Sensitivity)

Duration measures **price sensitivity to interest-rate changes**.

There are two major forms:

---

## 5.1 Macaulay Duration

Present-value weighted average time of cash flows:

$$
D
=
\frac{
  \sum t_i \, CF_i \, DF(0, t_i)
}{
  P
}
$$

Interpretation:

- Average timing of discounted cash flows  
- Zero-coupon bond: $D = T$  
- Higher coupon → lower duration  

---

## 5.2 Modified Duration (Sensitivity Form)

Converted into true price sensitivity:

$$
D_{\text{mod}}
=
-\frac{1}{P}
\frac{\partial P}{\partial r}
$$

Approximate percentage price change:

$$
\frac{\Delta P}{P}
\approx
- D_{\text{mod}} \, \Delta r
$$

---

# 6. DV01 (Dollar Value of 1 Basis Point)

DV01 measures **absolute** price change from a 1 bp move:

$$
DV01
\approx
D_{\text{mod}}
\cdot P
\cdot 0.0001
$$

Interpretation:

- “If rates move by 1 bp, how many dollars does the bond gain/lose?”  
- Traders quote DV01 for hedging and risk reporting  

---

# 7. Convexity (Second-Order Sensitivity)

Bond prices are **convex** in interest rates.  
Convexity corrects the linear approximation from duration.

Convexity:

$$
Conv
=
\frac{1}{P}
\frac{\partial^2 P}{\partial r^2}
$$

With convexity, price change approximation becomes:

$$
\frac{\Delta P}{P}
\approx
- D_{\text{mod}} \Delta r
+
\frac{1}{2}
Conv (\Delta r)^2
$$

Interpretation:

- Duration = slope (first order)  
- Convexity = curvature (second order)  
- Convexity is always positive for standard bonds  
- High convexity improves P&L in volatile markets  

---

# 8. Key Rate DV01 (Curve-Shape Sensitivity)

Parallel DV01 shifts the whole curve at once.  
**Key Rate DV01** shifts specific maturities:

- 2Y  
- 5Y  
- 10Y  
- 30Y  

Definition:

The price change when **only a single maturity point** of the curve shifts 1 bp.

If $k_i$ is the key rate:

$$
KR01_i
=
-
\frac{\partial P}{\partial k_i}
\times
0.0001
$$

Uses:

- Steepener / Flattener positions  
- Localized hedging  
- Understanding where risk is concentrated along the curve  

---

# 9. Summary

- Zero-coupon bond: $P = N \cdot DF(0,T)$  
- Coupon bond: sum of discounted coupons and principal  
- Duration: first-order rate sensitivity  
- DV01: dollar impact of 1 bp move  
- Convexity: second-order correction  
- Key Rate DV01: sensitivity to curve shape changes  

Together, they form the complete risk toolkit for bond analysis.
