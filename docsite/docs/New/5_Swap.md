---
id: swaps
title: Interest Rate Swaps
sidebar_label: Swaps
---

# Interest Rate Swaps

An **Interest Rate Swap (IRS)** exchanges:

- Fixed leg: fixed rate payments  
- Floating leg: floating rate payments (SOFR, LIBOR historic, EURIBOR, etc.)

Swaps are fundamental in:
- Yield curve construction  
- Hedging (DV01/PV01/KR01)  
- Pricing and valuation engines (e.g., Numerix, Murex, QuantLib)  

---

# 1. Structure of a Vanilla IRS

A payer swap (fixed payer) pays:

- Fixed coupons: $cN\Delta_i$  
- Receives floating coupons that reset at each period

Notation:

- $N$: notional  
- $t_i$: payment dates  
- $\Delta_i$: accrual fraction  
- $S_T$: par swap rate for maturity $T$

---

# 2. Floating Leg PV = 1 (Key Identity)

A floating leg behaves like a par FRN (floating-rate note).

Right after reset:

- Future floating payment = forward rate  
- Discounted expected value = par  
- Therefore the entire floating leg is worth **notional**:

$$
PV_{\text{float}} = 1
$$

This identity is the **backbone of swap pricing**  
and enables bootstrapping the long end of the curve.

---

# 3. Fixed Leg PV

The fixed leg pays:

- Coupons: $S_T N \Delta_i$  
- Principal: returned only implicitly via par condition

Present value of fixed leg:

$$
PV_{\text{fixed}}
=
S_T
\sum_{i=1}^{n}
\Delta_i \cdot DF(0, t_i)
+
DF(0, T)
$$

---

# 4. Par Swap Condition (Determining the Swap Rate)

At inception, a par swap has:

$$
PV_{\text{fixed}}
=
PV_{\text{float}}
=
1
$$

Thus:

$$
1
=
S_T
\sum_{i=1}^{n}
\Delta_i \cdot DF(0, t_i)
+
DF(0, T)
$$

Solve for the **par swap rate** $S_T$:

$$
S_T
=
\frac{
  1 - DF(0, T)
}{
  \sum_{i=1}^{n}
  \Delta_i \cdot DF(0, t_i)
}
$$

Interpretation:

- Numerator = PV of principal (since floating is worth par)  
- Denominator = PV01 of fixed leg  
- Swap rate = principal PV / fixed PV01  

This is the standard form used in Bloomberg, QuantLib, and pricing engines.

---

# 5. Swap PV After Inception

When the swap rate changes from par level $S_T$ to new market rate $S_{\text{mkt}}$:

Swap PV:

$$
PV_{\text{swap}}
=
(PV01_{\text{fixed}})
\cdot
(S_{\text{mkt}} - S_T)
$$

Where:

$$
PV01_{\text{fixed}}
=
\sum_{i=1}^{n}
\Delta_i \cdot DF(0, t_i)
$$

Interpretation:

- Swap value increases when market fixed rates rise (payer swap gains)  
- Swap value is linear in rate difference  
- PV01 is the slope (sensitivity)  

---

# 6. Swap DV01 / PV01

PV01 (also called DV01 in some markets):

$$
PV01
=
\sum_{i=1}^{n}
\Delta_i \cdot DF(0, t_i)
$$

This is:

- Sensitivity of fixed-leg PV to a 1 bp rate move  
- Most fundamental risk measure for swaps  

Swap DV01:

$$
DV01
\approx
PV01 \times 0.0001
$$

---

# 7. Why Swap Float PV = 1 (Derivation)

Consider a floating-rate note (FRN) with unit notional and reset dates:

- Payment dates: $t_1, t_2, \dots, t_n$
- Accruals: $\Delta_i$
- Forward rate for each period: $f_i = f(t_{i-1}, t_i)$

Cashflows per notional:

- At each $t_i$: $f_i \Delta_i$
- At final $T$: principal = 1

PV of the FRN:

$$
PV_{\text{FRN}}
=
\sum_{i=1}^{n} f_i \Delta_i \, DF(0,t_i)
+
DF(0,T)
$$

Using the no-arbitrage relationship between forward rates and discount factors:

$$
f_i \Delta_i \, DF(0,t_i)
=
DF(0,t_{i-1}) - DF(0,t_i)
$$

Substitute into the FRN PV:

$$
PV_{\text{FRN}}
=
\sum_{i=1}^{n}
\left( DF(0,t_{i-1}) - DF(0,t_i) \right)
+
DF(0,T)
$$

The series telescopes:

$$
PV_{\text{FRN}}
=
DF(0,0) - DF(0,T) + DF(0,T)
=
1
$$

Thus the floating leg of an IRS (an FRN) is **always worth par** (per unit notional),
independent of the shape of the forward curve.

---

# 8. Swaps as Bond Differences

A fixed-for-floating swap is equivalent to:

$$
\text{Swap} = \text{Floating Bond (FRN)} - \text{Fixed Coupon Bond}
$$

### Cashflow structure per unit notional

**Floating leg (FRN):**
- $f_1 \Delta_1$, $f_2 \Delta_2$, … $f_n \Delta_n$
- Principal $1$ at $T$
- PV = 1 (as proved above)

**Fixed leg (bond):**
- $S_T \Delta_1$, $S_T \Delta_2$, … $S_T \Delta_n$
- Principal $1$ at $T$

Thus swap cashflows:

$$
(f_1 - S_T)\Delta_1,\;
(f_2 - S_T)\Delta_2,\;
\dots,\;
(f_n - S_T)\Delta_n
$$

### Swap PV

$$
PV_{\text{swap}} = PV_{\text{FRN}} - PV_{\text{fixed bond}}
$$

Given:

- $PV_{\text{FRN}} = 1$
- $PV_{\text{fixed bond}} = S_T \cdot PV01 + DF(0,T)$

We obtain:

$$
PV_{\text{swap}} = 1 - \left(S_T \cdot PV01 + DF(0,T)\right)
$$

This decomposition explains:

- Why the **fixed leg carries all the duration risk**  
- Why swap DV01 = fixed-bond DV01  
- Why par swap rate makes the two bonds’ PV equal  
- Why swap valuation is linear in rate changes  


---

# 9. Key Rate DV01 for Swaps

A swap’s risk profile is richer than a bond’s:

- Fixed leg has long-end exposure  
- Floating leg resets short-end exposure  

Thus key-rate DV01 reveals:

- Which curve segments drive swap value  
- Steepener/Flattener exposure  
- How to hedge different maturity buckets  

If $k_i$ is the key swap curve node:

$$
KR01_i
=
-
\frac{\partial PV_{\text{swap}}}{\partial k_i}
\times
0.0001
$$

---

# 10. Summary

- Swap = exchange of fixed and floating payments  
- Floating leg always PV = 1  
- Par swap rate solves: $PV_{\text{fixed}} = 1$  
- Swap valuation after inception uses PV01 and rate difference  
- PV01 / DV01 measure swap sensitivity  
- Key-rate DV01 reveals curve-shape risk  

Swaps are the backbone of yield-curve construction and interest-rate risk management.
