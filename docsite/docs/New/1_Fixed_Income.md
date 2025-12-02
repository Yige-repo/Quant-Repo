---
id: fundamentals
title: Fixed-Income Fundamentals
sidebar_label: Fundamentals
---

# Fixed-Income Fundamentals

This chapter introduces a unified vocabulary that appears throughout all fixed-income, rates, and derivative pricing topics.  
Everything else (bonds, swaps, DV01, bootstrapping, XVA) is built on this layer.

---

## 1. Cash Flow (CF)

A **cash flow** is a contractual payment at a specific future time:

$$
CF_i \text{ at time } t_i
$$

Properties:

- Determined **only** by the contract  
- **Unaffected** by market interest rate movements  
- Examples:
  - Coupon = $c N \Delta$
  - Final redemption = $N$

---

## 2. Discount Factor (DF)

A **discount factor** converts future cash into today's value:

$$
PV = CF_i \cdot DF(0, t_i)
$$

Key points:

- Determined by **market rates**, not by the contract  
- Always between $0$ and $1$  
- Higher rates → smaller DF → smaller PV  

For continuous compounding:

$$
DF(0, T) = e^{-R(0, T) T}
$$

(Full details in *Rates & Curves*.)

---

## 3. Present Value (PV)

The price of any fixed-income instrument is:

$$
P = \sum_{i=1}^{n} CF_i \cdot DF(0, t_i)
$$

This is the **master formula** of fixed-income pricing.

All instruments (bonds, swaps, FRNs, forwards, XVA) reduce to this structure.

---

## 4. Coupon Rate vs Market Rate

### 4.1 Coupon Rate $c$

- Written in the contract  
- Defines **cash flows**  
- Does **not** move with the market  

### 4.2 Market Rate (yield, zero rate)

- Implied from **market prices**  
- Defines **discount factors**, not cash flows  

**Core philosophy:**  
> CF is contract-defined; DF is market-defined.

---

## 5. Price–Yield Relationship

For instruments with all positive cash flows:

- Price ↓ when yield ↑  
- Price ↑ when yield ↓  

Because yield changes → discount factors change → PV changes.

The price–yield curve is strictly decreasing and convex.

---

## 6. Tenor vs Maturity

- **Tenor** = cash-flow interval (1M, 3M, 6M, 1Y)  
- **Maturity** = contract endpoint (e.g., 5Y or 2030-12-30)  

They describe different dimensions of a product.

---

## 7. Zero-Coupon vs Coupon Instruments

### Zero-coupon bond

Single cash flow:

$$
P = N \cdot DF(0, T)
$$

### Fixed coupon bond

Cash flow stream:

- Coupons every period  
- Principal at maturity  

---

## 8. Unified Notation Map

| Concept        | Symbol        | Meaning                           |
|---------------|---------------|-----------------------------------|
| Cash flow     | $CF_i$      | Payment at time $t_i$          |
| Discount factor | $DF(0, t)$ | Present-value multiplier         |
| Present value | $PV$        | $\sum CF_i \cdot DF(0, t_i)$   |
| Coupon rate   | $c$         | Contractual coupon rate          |
| Market rate   | $r, y$      | Determines discount factors      |
| Notional      | $N$         | Principal                        |
| Accrual factor| $\Delta_i$  | Daycount fraction                |

---

## 9. Fixed-Income Mindset

- Instruments define **cash flows**  
- Markets define **discounting**  
- Pricing = CF × DF  
- Risk = how discount factors react to rate movements  

This philosophy carries through all later chapters.
