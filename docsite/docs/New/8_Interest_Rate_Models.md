# Interest Rate Models

## 1. Introduction
Interest rate models describe how future interest rates evolve over time.  
They provide the stochastic process behind rates and are required for:

- Zero-coupon bond pricing  
- Swap pricing  
- Swaption pricing  
- Risk (DV01 / PV01 / IR01)  
- Exposure simulation (EE, EPE, PFE, XVA)

Short-rate models directly model the instantaneous short rate $ r_t $:

$$
dr_t = \text{drift}(t,r_t)\,dt + \text{vol}(t,r_t)\,dW_t
$$

Two components:

- Deterministic drift → long-term tendency / curve calibration  
- Stochastic diffusion → randomness (Brownian motion)

---

## 2. Short-Rate Models (Overview)

Short-rate models specify the evolution of $ r_t $.  
Common models:

- Vasicek Model  
- Hull–White One-Factor Model (HW1F)  
- CIR Model  
- Extended short-rate models (CIR++, G2++, etc.)

We begin with the most widely used model: **Hull–White One-Factor Model**.

---

# 3. Hull–White One-Factor Model (HW1F)

## 3.1 Model Definition

$$
dr_t = a(\theta(t) - r_t)\,dt + \sigma\,dW_t
$$

Where:

- $a$: Mean-reversion speed  
- $\theta(t)$: Time-dependent drift (curve-fitting function)  
- $\sigma$: Volatility  
- $W_t$: Brownian motion

Properties:

- Linear SDE → Gaussian process  
- Drift pulls $r_t$ toward $\theta(t)$  
- Noise term contributes uncertainty ~ $\sqrt{dt}$

---

## 3.2 Why Hull–White?

### Limitations of Vasicek
$$
dr_t = a(b - r_t)\,dt + \sigma dW_t
$$

- Uses constant long-term mean $b$  
- Can only produce smooth exponential-type yield curves  
- Cannot fit real market curves (inverted / humped / non-monotonic)

### Advantage of Hull–White
Replace constant $b$ with time-dependent $\theta(t)$:

- $\theta(t)$ is calibrated from market zero-coupon curve  
- Allows perfect fit to today's entire yield curve  
- Ensures model is arbitrage-free relative to market data

---

## 3.3 Calibration: Determining $\theta(t)$

Calibration condition:

$$
P^{HW}(0,T) = P^{mkt}(0,T)
$$

Hull–White bond price:

$$
P(0,T) = A(0,T)\exp(-B(0,T)r_0)
$$

Where:

$$
B(0,T) = \frac{1 - e^{-aT}}{a}
$$

This implies:

$$
A(0,T) = P^{mkt}(0,T)\, e^{B(0,T) r_0}
$$

Using the relationship between $A(0,T)$ and $\theta(t)$, we obtain:

$$
\theta(t)
=
\frac{\partial f(0,t)}{\partial t}
+ a f(0,t)
+ \frac{\sigma^2}{2a}(1 - e^{-2at})
$$

Where $f(0,t)$ is the instantaneous forward curve from market data.

Interpretation:

- $\theta(t)$ ensures the model reproduces today's observed yield curve  
- Future randomness is driven only by $\sigma dW_t$, not by $\theta(t)$

---

## 3.4 Closed-Form Bond Price

Under HW1F:

$$
P(t,T) = A(t,T)\exp(-B(t,T)r_t)
$$

Where:

$$
B(t,T) = \frac{1-e^{-a(T-t)}}{a}
$$

- $B(t,T)$: Sensitivity of bond price to the short rate  
- $A(t,T)$: Adjustment term ensuring curve fit (depends on $\theta(t)$)

Reason bond price is exponential-affine:

- $r_t$ is Gaussian  
- $\int_t^T r_s ds$ is Gaussian  
- Expectation of $\exp(\text{Gaussian})$ has closed form

---

## 3.5 Monte Carlo Simulation

Euler discretization:

$$
r_{t+\Delta t}
=
r_t
+ a(\theta(t)-r_t)\Delta t
+ \sigma\sqrt{\Delta t}\,Z
$$

Where $Z \sim N(0,1)$.

Interpretation:

- Drift term reverts toward $\theta(t)$  
- Diffusion term introduces $\sqrt{dt}$-scale randomness  
- $\theta(t)$ is deterministic and fixed after calibration

---

## 3.6 Economic Interpretation

- **a** → Speed of mean reversion  
- **σ** → Strength of future uncertainty  
- **$\theta(t)$** → Target path needed to match today’s curve  

Meaning:

> Start exactly from today’s market curve,  
> then let rates evolve stochastically with mean reversion.

---

## 3.7 Why Hull–White is Important

Advantages:

- Fits any initial yield curve  
- Closed-form bond prices  
- Closed-form swap & swaption pricing (Jamshidian)  
- Gaussian → easy Monte Carlo  
- Used in:
  - Market risk  
  - XVA  
  - Exposure simulation  
  - Structured rate products

---

# 4. Vasicek Model (for comparison)
*(To be added)*

---

# 5. CIR Model
*(To be added)*

---

# 6. HJM Framework
*(To be added)*

---

# 7. Libor Market Model (LMM / BGM)
*(To be added)*

---

# 8. Multi-Curve Models (OIS vs LIBOR)
*(To be added)*

---

# 9. Pricing Applications
- Bonds  
- Swaps  
- Swaptions (Jamshidian)  
*(To be added)*

---

# 10. Risk Applications
- DV01 / PV01  
- IR01  
- Bucket risk  
- EE / EPE / PFE / XVA  
*(To be added)*

