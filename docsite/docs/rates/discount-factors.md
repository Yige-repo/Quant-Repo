# Discount Factors (DF)

Discount factors are the fundamental object in fixed-income pricing.  
All zero rates, forward rates, swap rates, bond prices are derived from DF.

---

## 1. Definition

The discount factor is the present value of receiving 1 unit of currency at time \(T\).

$$
PV = CF_T \cdot DF(0,T)
$$

---

## 2. Relationship to interest rates

### 2.1 Simple interest (market convention)

Used for deposits, FRNs, FRAs.

$$
DF(0,T) = \frac{1}{1 + r \Delta}
$$

Where:

$$
\Delta
$$

is the daycount fraction.

---

### 2.2 Periodic compounding (bonds)

$$
DF(0,T) = \frac{1}{\left(1+\frac{y}{m}\right)^{mT}}
$$

---

### 2.3 Continuous compounding (quant math)

$$
DF(0,T) = e^{-R(0,T)T}
$$

Continuous compounding is used for internal calculations because:

- smooth derivatives  
- easy interpolation  
- model friendly  

---

## 3. Zero rate from DF

$$
R(0,T) = -\frac{1}{T} \ln\!\big(DF(0,T)\big)
$$

---

## 4. Forward rate from DF

$$
f(T_1,T_2) 
= -\frac{1}{T_2 - T_1}
\ln\!\left(\frac{DF(0,T_2)}{DF(0,T_1)}\right)
$$

---

## 5. Why DF is the “base layer”

- Market quotes are messy (simple interest, periodic, etc.)
- DF unifies all of them
- Pricing = cashflows × DF
- Curves are built in DF space

**DF is the backbone of all fixed-income pricing.**
