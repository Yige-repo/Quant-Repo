---
id: bootstrapping
title: Bootstrapping the Yield Curve
sidebar_label: Bootstrapping
---

# Bootstrapping the Yield Curve

**Bootstrapping** is the process of converting **market quotes** (deposits, futures, FRAs, swaps)  
into a full **discount factor curve (DF curve)**.

This DF curve is then used to derive:

- Zero curve  
- Forward curve  
- Reconstructed par curve  
- Pricing for all fixed-income instruments  

Bootstrapping is the foundation of modern interest-rate pricing.

---

## 1. Overview

Market quotes **do not give discount factors directly**.

They give:

- Deposit rates → short end  
- Futures / FRA rates → forwards in the middle  
- Swap par rates → long end  

Bootstrapping solves DF points **one by one**, from short → long.

High-level flow:

Market quotes → DF curve → Zero curve → Forward curve


---

## 2. Step 1 — Deposits (Short End)

Deposits cover the **very short maturities** (1D to ~3M).

For simple interest with accrual factor $\Delta$:

$$
DF(0, T) = \frac{1}{1 + r \Delta}
$$

Example:

- 3M deposit at 4%  
- $\Delta = 0.25$

$$
DF(0, 0.25) = \frac{1}{1 + 0.04 \times 0.25}
$$

Deposits give the first few discount factors:

- Overnight / Tom-Next  
- 1W  
- 1M  
- 3M  

These serve as the base of the curve.

---

## 3. Step 2 — FRAs / Futures (Middle of the Curve)

FRA or futures quotes give **forward rates**:

- FRA(3x6) gives forward rate from $T_1 = 3\text{M}$ to $T_2 = 6\text{M}$  
- Futures imply forward 3M or 6M rates in each bucket

Given a forward rate $f(T_1, T_2)$:

$$
f(T_1, T_2)
=
-\frac{1}{T_2 - T_1}
\ln\left(
  \frac{DF(0, T_2)}{DF(0, T_1)}
\right)
$$

Solve for the next discount factor:

$$
DF(0, T_2)
=
DF(0, T_1) \cdot
e^{-f(T_1, T_2)(T_2 - T_1)}
$$

Thus the curve is extended one forward period at a time:

- 3M → 6M  
- 6M → 9M  
- 9M → 12M  
- … up to around 1–2Y via FRAs / futures

---

## 4. Step 3 — Swaps (Long End)

Swap market quotes give **par swap rates** $S_T$ for various maturities $T$.

Par condition:

$$
PV_{\text{fixed}} = PV_{\text{float}} = 1
$$

### 4.1 Floating Leg PV (why it equals 1)

The floating leg of a par swap is equivalent to a par FRN (floating-rate note).  
Right after reset, the FRN is always worth par:

$$
PV_{\text{float}} = 1
$$

This fact is crucial—it allows us to bootstrap long-end discount factors.

---

### 4.2 Fixed Leg PV and Solving for DF

Fixed-leg present value:

$$
PV_{\text{fixed}}
=
S_T \sum_{i=1}^{n}
\Delta_i \cdot DF(0, t_i)
+
DF(0, T)
$$

At par:

$$
1 = PV_{\text{fixed}} = PV_{\text{float}}
$$

So for a newly issued par swap:

$$
1 =
S_T \sum_{i=1}^{n-1}
\Delta_i \cdot DF(0, t_i)
+
DF(0, T)
$$

Everything on the right-hand side is known **except** $DF(0, T)$ (the last maturity).  
Solve for it:

$$
DF(0, T)
=
1
-
S_T
\sum_{i=1}^{n-1}
\Delta_i \cdot DF(0, t_i)
$$

Repeat this for each swap maturity:

- 2Y  
- 3Y  
- 5Y  
- 7Y  
- 10Y  
- 30Y  

You gradually extend the DF curve to the long end.

---

## 5. Step 4 — Convert DF to Zero and Forward Curves

Once you have discount factors at all required maturities:

### Zero rates:

$$
R(0, T)
=
-\frac{1}{T}
\ln\big(DF(0, T)\big)
$$

### Forward rates:

$$
f(T_1, T_2)
=
-\frac{1}{T_2 - T_1}
\ln\left(
  \frac{DF(0, T_2)}{DF(0, T_1)}
\right)
$$

DF curve is the **primary object**;  
zero and forward curves are just different parametrizations.

---

## 6. Full Bootstrapping Pipeline

Conceptual flow:

1. **Deposits** → short-end DF  
2. **FRAs / futures** → intermediate DF points  
3. **Swaps** → long-end DF  
4. **DF** → zero curve and forward curve  

Result: an **arbitrage-free discount curve** that can price any fixed-income instrument consistent with market quotes.

---

## 7. Mini Example (Conceptual Only)

Assume the following simplified quotes:

- 3M deposit @ 4.0%  
- 6M FRA (3x6) @ 4.3%  
- 1Y swap @ 4.5%

Then:

1. Use the 3M deposit to get $DF(0, 0.25)$.  
2. Use the FRA to extend to $DF(0, 0.5)$.  
3. Use the 1Y par swap condition to solve for $DF(0, 1.0)$.  
4. Convert all DFs to zero and forward rates.

A full worked numerical example can be added later, but the **logic and sequence** are as above.

---

## 8. Why Bootstrapping Matters

Bootstrapping ensures:

- **Consistency** across all market instruments  
- **Arbitrage-free** discount factors  
- Ability to price **any** fixed-income product using the same DF curve  
- Swap curves, OIS curves, and Treasury curves all follow the same logic  
- It is a core component of pricing engines (e.g., Numerix, Murex, QuantLib, Bloomberg)

Once the DF curve exists, everything else becomes a mechanical transformation.
