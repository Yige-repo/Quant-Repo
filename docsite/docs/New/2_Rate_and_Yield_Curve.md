---
id: rates-curve
title: Rates & Yield Curves
sidebar_label: Rates & Curves
---

# Rates & Yield Curves

This chapter establishes the three fundamental interest-rate curves used in pricing:

- **Zero curve (spot curve)** – used for discounting  
- **Forward curve** – implied future rates  
- **Par curve** – market-quoted rates (swap rates, deposit rates)  

All curves ultimately reduce to a **discount factor curve (DF curve)**.

---

## 1. Zero Curve (Spot Curve)

A zero rate $R(0, T)$ is the continuously compounded rate for maturity $T$.

Defined from discount factors:

$$
DF(0, T) = e^{-R(0, T) T}
$$

Thus:

$$
R(0, T) = -\frac{1}{T} \ln\big(DF(0, T)\big)
$$

**Zero curve**: all zero rates for maturities  
$T = 1\text{M}, 3\text{M}, 6\text{M}, \dots$

### Why zeros matter

- Zero curve is the **pricing curve**  
- All fixed-income pricing uses discount factors or zero rates  
- Yield-curve models use zero/forward curves, not par rates

---

## 2. Forward Curve

A forward rate $f(T_1, T_2)$ is the implied rate between two future times:

$$
f(T_1, T_2)
=
-\frac{1}{T_2 - T_1}
\ln\left(
  \frac{DF(0, T_2)}{DF(0, T_1)}
\right)
$$

Interpretation:

- “If I invest from $T_1$ to $T_2$, what rate is implied today?”  
- Forward curve reflects **market expectations** of future rates.

Forward curve is used in:

- Swap floating-leg projection  
- FRN pricing  
- Interest-rate models (HW, BK, HJM, etc.)

---

## 3. Par Curve

A **par rate** is the rate that makes an instrument priced at par.

Examples:

- Par bond: price = 100  
- Par swap: fixed PV = floating PV = 1  
- Par FRN: resets to par each period  

Par curve is the most commonly **quoted** curve:

- Deposit rates  
- Swap rates (2Y, 5Y, 10Y, …)  
- Futures / FRA rates  

But **par rates cannot be used directly for pricing**.  
They must be converted to discount factors first (bootstrapping).

---

## 4. Discount Factor Curve (DF Curve)

The **DF curve** is the backbone of all pricing:

$$
PV = \sum_{i=1}^{n} CF_i \cdot DF(0, t_i)
$$

Every curve is ultimately converted to discount factors.

**Market quotes → DF curve → Zero/Forward curve**

- Deposits → DF  
- FRAs / futures → DF  
- Swap par rates → DF  
- Then from DF → zero curve → forward curve  

Because DF is the only object that prices everything.

---

## 5. Curve Shapes: Normal vs Inverted

Real-world yield curves can take different shapes.

### Normal (upward sloping)

- Short-end rates are low  
- Long-end rates are higher  
- Typical in stable growth environments

### Inverted (downward sloping)

- Short-end rates are very high (tight monetary policy)  
- Long-end rates are lower (market expects cuts)  

Zero curve inherits this shape through:

$$
DF(0, T) = e^{-R(0, T) T}
$$

- If long-end zero rates fall → DF declines more slowly  
- The curve appears inverted

Yield-curve shape is driven by **economic expectations**, not math.

---

## 6. Tenor vs Maturity (Recap)

- **Tenor** = cash-flow interval (1M, 3M, 6M, 1Y)  
- **Maturity** = contract endpoint (e.g., 5Y or 2030-12-30)  

Tenor determines coupon/interest frequency.  
Maturity determines the final date.

---

## 7. Curve Conversion Summary

### Zero ↔ DF

$$
DF(0, T) = e^{-R(0, T) T}
$$

$$
R(0, T) = -\frac{1}{T} \ln\big(DF(0, T)\big)
$$

---

### Zero ↔ Forward

$$
f(T_1, T_2)
=
-\frac{1}{T_2 - T_1}
\ln\left(
  \frac{DF(0, T_2)}{DF(0, T_1)}
\right)
$$

---

### Par ↔ DF (via bootstrapping)

Par swap rate satisfies:

$$
PV_{\text{fixed}} = PV_{\text{float}} = 1
$$

The DF at swap maturity is solved such that the par condition holds.

(See *Bootstrapping* for full derivation.)

---

## 8. Summary: Why Curves Matter

- **Zero curve → pricing**  
- **Forward curve → expectations**  
- **Par curve → market quotes**  
- **DF curve → universal representation**

If you can work with the DF curve,  
you can price essentially any fixed-income instrument.
