
def plater(target)
  number = 10
  letter = 26
  min_leftover = letter * number * target
  min_indices = [0, 0]
  n = 0
  current = 1

  while(target*letter > current) do #multiplication is to head off any off-by-one errors
    i, leftover = overflow(target, current, number)
    if leftover < min_leftover
      min_indices = [n, i]
      min_leftover = leftover
    end
    n += 1
    current *= letter
  end

  return "The best combination will have #{min_indices[0]} letters and " +
      "#{min_indices[1]} numbers, with #{min_leftover} leftover plates."
end

def overflow(target, current, multiplier)
  i = 0
  while(target > current) do
    i += 1
    current *= multiplier
  end
  return [i, current - target]
end
